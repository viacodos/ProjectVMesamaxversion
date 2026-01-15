import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label, Card, CardHeader, CardContent, CardTitle, CardDescription, Separator } from '@project-v-redone/ui';
import { User, Lock, KeyRound, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

export const Profile = () => {
    const navigate = useNavigate();

    // Mock user data - in production, this would come from auth context/state
    const [userId] = useState('admin_12345');
    const [username, setUsername] = useState('admin');
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    // Password change state
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Feedback states
    const [usernameSuccess, setUsernameSuccess] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleUsernameChange = (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameError('');
        setUsernameSuccess(false);

        if (!newUsername.trim()) {
            setUsernameError('Username cannot be empty');
            return;
        }

        if (newUsername.length < 3) {
            setUsernameError('Username must be at least 3 characters');
            return;
        }

        // TODO: Call backend API to update username
        console.log('Updating username to:', newUsername);

        setUsername(newUsername);
        setIsEditingUsername(false);
        setUsernameSuccess(true);
        setNewUsername('');

        setTimeout(() => setUsernameSuccess(false), 3000);
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess(false);

        // Validation
        if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
            setPasswordError('All password fields are required');
            return;
        }

        if (passwordForm.newPassword.length < 8) {
            setPasswordError('New password must be at least 8 characters');
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        // TODO: Call backend API to change password
        console.log('Changing password...');

        setPasswordSuccess(true);
        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });

        setTimeout(() => setPasswordSuccess(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/dashboard')}
                    className="gap-2"
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Button>
            </div>

            <div>
                <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
            </div>

            {/* User ID Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User size={20} />
                        User Information
                    </CardTitle>
                    <CardDescription>Your unique identifier and account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label className="text-muted-foreground text-xs">User ID</Label>
                        <div className="mt-1 font-mono text-sm bg-muted/50 px-3 py-2 rounded-md border border-border">
                            {userId}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Username Change Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User size={20} />
                        Username
                    </CardTitle>
                    <CardDescription>Update your display username</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!isEditingUsername ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-muted-foreground text-xs">Current Username</Label>
                                <div className="mt-1 font-medium text-foreground">{username}</div>
                            </div>
                            <Button
                                onClick={() => {
                                    setIsEditingUsername(true);
                                    setNewUsername(username);
                                }}
                                variant="outline"
                            >
                                Change Username
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleUsernameChange} className="space-y-4">
                            <div>
                                <Label htmlFor="newUsername">New Username</Label>
                                <Input
                                    id="newUsername"
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    placeholder="Enter new username"
                                    className="mt-1"
                                />
                            </div>

                            {usernameError && (
                                <div className="flex items-center gap-2 text-destructive text-sm">
                                    <AlertCircle size={16} />
                                    {usernameError}
                                </div>
                            )}

                            <div className="flex gap-2">
                                <Button type="submit" className="bg-ochre hover:bg-ochre-dark">
                                    Save Username
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditingUsername(false);
                                        setNewUsername('');
                                        setUsernameError('');
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    )}

                    {usernameSuccess && (
                        <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 dark:bg-green-950/20 px-3 py-2 rounded-md">
                            <CheckCircle2 size={16} />
                            Username updated successfully!
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Password Change Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock size={20} />
                        Change Password
                    </CardTitle>
                    <CardDescription>Update your account password for better security</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <Label htmlFor="oldPassword" className="flex items-center gap-2">
                                <KeyRound size={14} />
                                Current Password
                            </Label>
                            <Input
                                id="oldPassword"
                                type="password"
                                value={passwordForm.oldPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                                placeholder="Enter current password"
                                className="mt-1"
                            />
                        </div>

                        <Separator />

                        <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                placeholder="Enter new password (min. 8 characters)"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                placeholder="Re-enter new password"
                                className="mt-1"
                            />
                        </div>

                        {passwordError && (
                            <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-3 py-2 rounded-md">
                                <AlertCircle size={16} />
                                {passwordError}
                            </div>
                        )}

                        {passwordSuccess && (
                            <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 dark:bg-green-950/20 px-3 py-2 rounded-md">
                                <CheckCircle2 size={16} />
                                Password changed successfully!
                            </div>
                        )}

                        <Button type="submit" className="w-full bg-ochre hover:bg-ochre-dark">
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border-ochre/20 bg-ochre/5">
                <CardContent className="pt-6">
                    <div className="flex gap-3">
                        <AlertCircle className="text-ochre flex-shrink-0 mt-0.5" size={20} />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">Security Notice</p>
                            <p className="text-xs text-muted-foreground">
                                Make sure to use a strong password with a mix of letters, numbers, and special characters.
                                Never share your password with anyone.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
