import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit3, Save } from 'lucide-react';
import { sectionVariants } from '@/lib/animations';

const SettingsTab = ({
  user,
  isEditing,
  formData,
  handleInputChange,
  handleSaveProfile,
  setIsEditing
}) => {
  return (
    <motion.section 
      variants={sectionVariants} 
      initial="initial" 
      animate="animate" 
      className="p-6 glass-effect-purple rounded-lg card-border-glow-purple space-y-6"
    >
      <h3 className="text-xl font-semibold text-foreground font-orbitron">Account Settings</h3>
      <div className="space-y-4 max-w-md">
          <div>
              <Label htmlFor="email-settings" className="font-mono text-muted-foreground">Email Address</Label>
              <Input id="email-settings" type="email" value={user?.emailAddresses?.[0]?.emailAddress || ''} disabled className="bg-input border-border mt-1"/>
          </div>
          {isEditing && (
            <>
              <div>
                  <Label htmlFor="avatar-url-settings" className="font-mono text-muted-foreground">Avatar URL</Label>
                  <Input 
                      id="avatar-url-settings" 
                      name="avatar_url" 
                      value={formData.avatar_url} 
                      onChange={handleInputChange} 
                      placeholder="https://example.com/avatar.png" 
                      className="bg-input border-border mt-1"
                  />
                  <p className="text-xs text-muted-foreground/70 mt-1 font-mono">Enter a direct URL to an image.</p>
              </div>
            </>
          )}
            <Button variant="outline" className="font-mono border-primary text-primary hover:bg-primary/10" onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}>
            {isEditing ? <><Save className="mr-2 h-4 w-4" />Save Settings</> : <><Edit3 className="mr-2 h-4 w-4" />Edit Details</>}
          </Button>
          <Button variant="outline" className="font-mono border-destructive text-destructive hover:bg-destructive/10">Change Password</Button>
          <Button variant="destructive" className="font-mono">Delete Account</Button>
      </div>
    </motion.section>
  );
};

export default SettingsTab;