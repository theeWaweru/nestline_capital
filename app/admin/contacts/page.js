"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { Mail, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyDialog, setReplyDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyForm, setReplyForm] = useState({ subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState("custom");
  const templates = {
    custom: {
      subject: `Re: ${selectedContact?.projectName} Inquiry`,
      body: "",
    },
    info: {
      subject: `${selectedContact?.projectName} - Additional Information`,
      body: `Dear ${selectedContact?.firstName},\n\nThank you for your interest in ${selectedContact?.projectName}.\n\nHere are some additional details:\n\n• Plot sizes: [Add details]\n• Pricing: [Add details]\n• Payment plans: [Add details]\n• Timeline: [Add details]\n\nWould you like to schedule a site visit or discuss further?\n\nBest regards,\nNestline Capital Team`,
    },
    followup: {
      subject: `Following up on ${selectedContact?.projectName}`,
      body: `Dear ${selectedContact?.firstName},\n\nI wanted to follow up on your inquiry about ${selectedContact?.projectName}.\n\nDo you have any questions I can help answer? I'm available for a call or site visit at your convenience.\n\nBest regards,\nNestline Capital Team`,
    },
    sitevisit: {
      subject: `Site Visit - ${selectedContact?.projectName}`,
      body: `Dear ${selectedContact?.firstName},\n\nThank you for your interest in visiting ${selectedContact?.projectName}.\n\nWe'd be happy to arrange a site visit. Please let us know your preferred date and time, and we'll coordinate accordingly.\n\nAvailable days: [Add availability]\n\nBest regards,\nNestline Capital Team`,
    },
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const res = await fetch("/api/admin/contacts");
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function openReply(contact) {
    setSelectedContact(contact);
    setEmailTemplate("custom");
    setReplyForm({
      subject: `Re: ${contact.projectName} Inquiry`,
      message: `Dear ${contact.firstName},\n\nThank you for your interest in ${contact.projectName}.\n\n`,
    });
    setReplyDialog(true);
  }
  function handleTemplateChange(template) {
    setEmailTemplate(template);
    if (template !== "custom") {
      setReplyForm({
        subject: templates[template].subject,
        message: templates[template].body,
      });
    }
  }

  async function sendReply() {
    if (!replyForm.subject || !replyForm.message) {
      alert("Please fill in subject and message");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/admin/contacts/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId: selectedContact._id,
          to: selectedContact.email,
          subject: replyForm.subject,
          message: replyForm.message,
        }),
      });

      if (res.ok) {
        alert("Reply sent successfully!");
        setReplyDialog(false);
        setReplyForm({ subject: "", message: "" });
      } else {
        alert("Failed to send reply");
      }
    } catch (error) {
      alert("Error sending reply");
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  async function updateStatus(contactId, newStatus) {
    try {
      await fetch(`/api/admin/contacts/${contactId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchContacts(); // Refresh list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  function exportToCSV() {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Project",
      "Message",
      "Status",
      "Date",
    ];
    const rows = contacts.map((c) => [
      `${c.firstName} ${c.lastName}`,
      c.email,
      c.phone,
      c.projectName,
      c.message.replace(/"/g, '""'), // Escape quotes
      c.status,
      new Date(c.submittedAt).toLocaleDateString(),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact Submissions</h1>
          <p className="text-gray-500 mt-2">
            Inquiries from website contact form
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {contact.firstName} {contact.lastName}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{contact.email}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Select
                    value={contact.status || "new"}
                    onValueChange={(value) => updateStatus(contact._id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={() => openReply(contact)}>
                    <Mail className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Project Interest</p>
                  <p className="text-sm text-gray-600">{contact.projectName}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Message</p>
                <p className="text-sm text-gray-700">{contact.message}</p>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Submitted {formatDistanceToNow(new Date(contact.submittedAt))}{" "}
                ago
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Dialog */}
      <Dialog open={replyDialog} onOpenChange={setReplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Reply to {selectedContact?.firstName} {selectedContact?.lastName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium">To:</label>
              <Input
                value={selectedContact?.email || ""}
                disabled
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Template:</label>
              <Select
                value={emailTemplate}
                onValueChange={handleTemplateChange}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom Message</SelectItem>
                  <SelectItem value="info">Project Information</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                  <SelectItem value="sitevisit">
                    Site Visit Invitation
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Subject:</label>
              <Input
                value={replyForm.subject}
                onChange={(e) =>
                  setReplyForm({ ...replyForm, subject: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message:</label>
              <Textarea
                value={replyForm.message}
                onChange={(e) =>
                  setReplyForm({ ...replyForm, message: e.target.value })
                }
                rows={10}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-2">
                This will be sent in Nestline Capital&apos;s branded email
                template
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setReplyDialog(false)}>
                Cancel
              </Button>
              <Button onClick={sendReply} disabled={sending}>
                {sending ? "Sending..." : "Send Reply"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
