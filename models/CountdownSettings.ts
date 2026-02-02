import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICountdownSettings extends Document {
  key: string;
  targetDate: Date;
  title: string;
  subtitle: string;
  goals: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const CountdownSettingsSchema = new Schema<ICountdownSettings>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'my-vision',
    },
    targetDate: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      default: 'Mission Countdown',
    },
    subtitle: {
      type: String,
      default: 'The Journey to Excellence',
    },
    goals: [
      {
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CountdownSettings: Model<ICountdownSettings> =
  mongoose.models?.CountdownSettings ||
  mongoose.model<ICountdownSettings>('CountdownSettings', CountdownSettingsSchema);

export default CountdownSettings;
