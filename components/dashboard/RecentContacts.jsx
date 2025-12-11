'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function RecentContacts({ contacts }) {
    if (!contacts || contacts.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Recent Contact Inquiries
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500">No recent inquiries</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Recent Contact Inquiries
                </CardTitle>
                <Link href="/admin/contacts">
                    <Button variant="ghost" size="sm">
                        View All
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {contacts.map((contact) => (
                        <div key={contact._id} className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-medium text-sm">{contact.firstName} {contact.lastName}</p>
                                    <Badge variant={contact.status === 'new' ? 'default' : 'secondary'} className="text-xs">
                                        {contact.status}
                                    </Badge>
                                </div>
                                <p className="text-xs text-gray-500">{contact.email}</p>
                                <p className="text-xs text-gray-600 mt-1">{contact.projectName}</p>
                            </div>
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                                {formatDistanceToNow(new Date(contact.submittedAt), { addSuffix: true })}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}