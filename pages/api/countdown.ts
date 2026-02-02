import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import CountdownSettings from '@/models/CountdownSettings';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      let settings = await CountdownSettings.findOne({ key: 'my-vision' });

      // If no settings exist, create default ones with target date 1/1/2029 Bangkok time (UTC+7)
      if (!settings) {
        // Bangkok is UTC+7, so midnight Bangkok = 17:00 UTC previous day
        settings = await CountdownSettings.create({
          key: 'my-vision',
          targetDate: new Date('2028-12-31T17:00:00.000Z'), // = 2029-01-01 00:00:00 Bangkok
          title: 'Mission Countdown',
          subtitle: 'The Journey to Excellence',
          goals: [
            { icon: '🎓', title: 'IELTS Excellence', description: 'Master English at International Level' },
            { icon: '🔐', title: 'Offensive Cyber Research', description: 'Cybersecurity Expertise' },
            { icon: '💰', title: 'Secure Funding', description: 'For a Better Future' },
            { icon: '🚀', title: 'Beyond & More', description: 'Progress Every Single Day' },
          ],
        });
      }

      // Calculate initial time (from now to target)
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
      console.error('Error fetching countdown settings:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch settings' });
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
