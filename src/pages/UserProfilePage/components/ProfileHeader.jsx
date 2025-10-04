import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit3, Save, Linkedin, ExternalLink } from 'lucide-react';
import { itemVariants } from '@/lib/animations';

export const rankColors = {
  'Script Kiddie': 'text-gray-400',
  'Noob': 'text-green-400',
  'Hacker': 'text-blue-400',
  'Pro Hacker': 'text-purple-400',
  'Elite Hacker': 'text-yellow-400',
  'Omniscient': 'text-red-500',
  'PentStark': 'text-pink-500'
};

const ProfileHeader = ({
  profile,
  user,
  isEditing,
  formData,
  handleInputChange,
  handleSaveProfile,
  setIsEditing,
  loading
}) => {
  const fallbackName = formData.name ? formData.name.substring(0, 2).toUpperCase() : (user?.emailAddresses?.[0]?.emailAddress ? user.emailAddresses[0].emailAddress.substring(0, 2).toUpperCase() : 'PN');
  const userRank = profile?.rank || 'Script Kiddie';
  const userXP = profile?.xp || 0;
  const currentRankColor = rankColors[userRank] || 'text-gray-400';

  return (
    <div className="mb-10 md:mb-12 p-6 md:p-8 glass-effect-purple rounded-xl card-border-glow-purple flex flex-col md:flex-row items-center gap-6 md:gap-8">
      <motion.div variants={itemVariants}>
        <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-primary shadow-lg">
          <AvatarImage src={formData.avatar_url || profile?.avatar_url} alt={formData.name || profile?.name} />
          <AvatarFallback className="text-3xl bg-muted text-muted-foreground">{fallbackName}</AvatarFallback>
        </Avatar>
      </motion.div>
      <motion.div variants={itemVariants} className="flex-grow text-center md:text-left">
        {isEditing ? (
          <>
            <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" className="text-3xl font-bold mb-1 bg-input border-border font-orbitron" />
            <Input name="country" value={formData.country} onChange={handleInputChange} placeholder="Location (e.g. Country)" className="text-sm bg-input border-border mb-2 font-mono" />
            <Input name="linkedin_url" value={formData.linkedin_url} onChange={handleInputChange} placeholder="LinkedIn Profile URL" className="text-sm bg-input border-border mb-2 font-mono" />
            <Textarea name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Your Bio" className="text-sm bg-input border-border h-20 font-mono" />
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-orbitron mb-1">{profile?.name}</h1>
            <p className={`font-mono text-lg mb-1 ${currentRankColor}`}>{userRank} - {userXP} XP</p>
            <p className="text-muted-foreground text-sm font-mono mb-1">{profile?.country || 'Location not set'}</p>
            {profile?.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-secondary/80 font-mono flex items-center justify-center md:justify-start mb-2">
                <Linkedin className="mr-1.5 h-4 w-4" /> LinkedIn Profile <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            )}
            <p className="text-muted-foreground text-sm font-mono italic line-clamp-2">{profile?.bio || 'No bio yet.'}</p>
          </>
        )}
      </motion.div>
      <motion.div variants={itemVariants} className="flex flex-col items-center md:items-end gap-3 mt-4 md:mt-0 self-start md:self-auto">
        {isEditing ? (
          <Button onClick={handleSaveProfile} disabled={loading} className="font-mono w-full md:w-auto bg-primary hover:bg-primary/90">
            <Save className="mr-2 h-4 w-4" /> Save Profile
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)} variant="outline" className="font-mono w-full md:w-auto border-primary text-primary hover:bg-primary/10">
            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileHeader;