import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  WhatsappIcon,
} from 'react-share';
import { FaShare, FaCopy } from 'react-icons/fa';

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
  tags?: string[];
}

export default function SocialShare({ url, title, description, tags = [] }: SocialShareProps) {
  const fullTitle = `${title} | 0dev.io`;
  const hashtags = tags.map(tag => `#${tag}`).join(' ');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="social-share">
      <div className="flex items-center space-x-2 mb-4">
        <FaShare className="text-matrix-green" />
        <span className="text-hacker-white font-medium">Share this post:</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <FacebookShareButton url={url} hashtag="#0dev">
          <FacebookIcon size={40} round className="hover:scale-110 transition-transform" />
        </FacebookShareButton>

        <TwitterShareButton url={url} title={fullTitle} hashtags={tags} via="0dev_io">
          <TwitterIcon size={40} round className="hover:scale-110 transition-transform" />
        </TwitterShareButton>

        <LinkedinShareButton url={url} title={fullTitle} summary={description} source="0dev.io">
          <LinkedinIcon size={40} round className="hover:scale-110 transition-transform" />
        </LinkedinShareButton>

        <RedditShareButton url={url} title={fullTitle}>
          <RedditIcon size={40} round className="hover:scale-110 transition-transform" />
        </RedditShareButton>

        <TelegramShareButton url={url} title={fullTitle}>
          <TelegramIcon size={40} round className="hover:scale-110 transition-transform" />
        </TelegramShareButton>

        <WhatsappShareButton url={url} title={fullTitle}>
          <WhatsappIcon size={40} round className="hover:scale-110 transition-transform" />
        </WhatsappShareButton>

        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-10 h-10 bg-hacker-gray hover:bg-matrix-green/20 border border-matrix-green/30 hover:border-matrix-green rounded-full transition-all duration-300 hover:scale-110"
          title="Copy link"
        >
          <FaCopy className="text-matrix-green w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 p-3 bg-hacker-darkgray/50 border border-hacker-gray/30 rounded-lg">
        <div className="text-sm text-hacker-lightgray mb-2">Share URL:</div>
        <div className="text-xs font-mono text-matrix-green break-all bg-black/30 p-2 rounded">
          {url}
        </div>
      </div>
    </div>
  );
}