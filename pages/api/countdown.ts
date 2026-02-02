import type { NextApiRequest, NextApiResponse } from 'next';

// Default fallback data (Bangkok timezone: midnight Bangkok = 17:00 UTC previous day)
const defaultSettings = {
  targetDate: '2028-12-31T17:00:00.000Z', // = 2029-01-01 00:00:00 Bangkok
  title: 'Mission Countdown',
  subtitle: 'The Journey to Excellence',
  goals: [
    { icon: '🎓', title: 'IELTS Excellence', description: 'Master English at International Level' },
    { icon: '🔐', title: 'Offensive Cyber Research', description: 'Cybersecurity Expertise' },
    { icon: '💰', title: 'Secure Funding', description: 'For a Better Future' },
    { icon: '🚀', title: 'Beyond & More', description: 'Progress Every Single Day' },
  ],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Try to connect to MongoDB
      const dbConnect = (await import('@/lib/mongodb')).default;
      const CountdownSettings = (await import('@/models/CountdownSettings')).default;
      
      await dbConnect();
      
      let settings = await CountdownSettings.findOne({ key: 'my-vision' });

      // If no settings exist, create default ones
      if (!settings) {
        settings = await CountdownSettings.create({
          key: 'my-vision',
          targetDate: new Date(defaultSettings.targetDate),
          title: defaultSettings.title,
          subtitle: defaultSettings.subtitle,
          goals: defaultSettings.goals,
        });
      }

      const now = new Date();
      const initialTime = settings.targetDate.getTime() - now.getTime();

      return res.status(200).json({
        success: true,
        data: {
          targetDate: settings.targetDate.toISOString(),
          title: settings.title,
          subtitle: settings.subtitle,
          goals: settings.goals,
          initialTime,
        },
      });
    } catch (error) {
      console.error('MongoDB connection failed, using fallback:', error);
      
      // Return fallback data when MongoDB is unavailable
      const now = new Date();
      const targetDate = new Date(defaultSettings.targetDate);
      const initialTime = targetDate.getTime() - now.getTime();

      return res.status(200).json({
        success: true,
        data: {
          targetDate: defaultSettings.targetDate,
          title: defaultSettings.title,
          subtitle: defaultSettings.subtitle,
          goals: defaultSettings.goals,
          initialTime,
        },
      });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { targetDate, title, subtitle, goals } = req.body;

      const settings = await CountdownSettings.findOneAndUpdate(
        { key: 'my-vision' },
        {
          ...(targetDate && { targetDate: new Date(targetDate) }),
          ...(title && { title }),
          ...(subtitle && { subtitle }),
          ...(goals && { goals }),
        },
        { new: true, upsert: true }
      );

      return res.status(200).json({ success: true, data: settings });
    } catch (error) {
      console.error('Error updating countdown settings:', error);
      return res.status(500).json({ success: false, error: 'Failed to update settings' });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
