
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Send, Mail, Database, FileText, Briefcase, Heart } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  subject: string;
  content: string;
}

const EmailComposer = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('blank');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const templates: EmailTemplate[] = [
    {
      id: 'blank',
      name: 'Blank Email',
      icon: <FileText className="h-5 w-5" />,
      subject: '',
      content: ''
    },
    {
      id: 'business',
      name: 'Business Professional',
      icon: <Briefcase className="h-5 w-5" />,
      subject: 'Business Inquiry',
      content: `Dear [Recipient Name],

I hope this email finds you well. I am writing to discuss [specific topic/purpose].

[Main content of your message - explain your purpose, provide necessary details, and include any relevant information.]

I would appreciate the opportunity to discuss this further at your convenience. Please let me know if you need any additional information.

Thank you for your time and consideration.

Best regards,
[Your Name]
[Your Position]
[Your Company]
[Contact Information]`
    },
    {
      id: 'meeting',
      name: 'Meeting Request',
      icon: <Mail className="h-5 w-5" />,
      subject: 'Meeting Request - [Topic]',
      content: `Dear [Recipient Name],

I hope you are doing well. I would like to schedule a meeting to discuss [meeting purpose/topic].

Meeting Details:
• Purpose: [Brief description]
• Duration: [Estimated time]
• Preferred dates: [Suggest 2-3 options]
• Format: [In-person/Virtual]

Please let me know your availability, and I will send a calendar invitation accordingly.

Looking forward to our discussion.

Best regards,
[Your Name]
[Your Position]
[Contact Information]`
    },
    {
      id: 'followup',
      name: 'Follow-up',
      icon: <Heart className="h-5 w-5" />,
      subject: 'Following up on [Topic]',
      content: `Dear [Recipient Name],

I wanted to follow up on our recent [conversation/meeting/email] regarding [topic].

[Briefly recap the previous interaction and mention any key points or action items discussed.]

I wanted to check if you had any questions or if there's anything else I can help you with regarding this matter.

Please feel free to reach out if you need any clarification or additional information.

Thank you for your time.

Best regards,
[Your Name]
[Your Position]
[Contact Information]`
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setContent(template.content);
    }
  };

  const convertToHTML = (plainText: string) => {
    // Convert plain text to HTML with proper formatting
    const htmlContent = plainText
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/\[(.*?)\]/g, '<strong>[$1]</strong>');
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject || 'Email'}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .email-container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        p {
            margin-bottom: 16px;
        }
        strong {
            color: #2563eb;
        }
        .signature {
            margin-top: 30px;
            border-top: 2px solid #e5e7eb;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <p>${htmlContent}</p>
    </div>
</body>
</html>`;
  };

  const handleSaveEmail = async () => {
    if (!subject.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both subject and content fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const htmlContent = convertToHTML(content);
      
      const emailData = {
        recipient: recipient || 'Not specified',
        subject: subject,
        plainContent: content,
        htmlContent: htmlContent,
        template: selectedTemplate,
        createdAt: new Date().toISOString()
      };

      const response = await fetch('/api/save-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Email has been saved successfully!",
        });
        
        // Reset form
        setSubject('');
        setContent('');
        setRecipient('');
        setSelectedTemplate('blank');
      } else {
        throw new Error('Failed to save email');
      }
    } catch (error) {
      console.error('Error saving email:', error);
      toast({
        title: "Error",
        description: "Failed to save email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      {/* Navigation Header */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        <a href="/file-processor">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-lg">
            <Database className="h-4 w-4 mr-2" />
            File Processor
          </Button>
        </a>
        <a href="/">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-lg">
            <Mail className="h-4 w-4 mr-2" />
            Email Generator
          </Button>
        </a>
        <a href="/mail-sender">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-lg">
            <Send className="h-4 w-4 mr-2" />
            Send Mail
          </Button>
        </a>
        <a href="/email-composer">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-lg">
            <FileText className="h-4 w-4 mr-2" />
            Compose Email
          </Button>
        </a>
      </div>

      <div className="max-w-6xl mx-auto pt-20">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <FileText className="h-8 w-8 text-purple-600" />
              Email Composer
            </CardTitle>
            <p className="text-lg text-gray-600 mt-2">
              Create professional emails with modern templates
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Template Selection */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
                <div className="space-y-2">
                  {templates.map((template) => (
                    <Button
                      key={template.id}
                      variant={selectedTemplate === template.id ? "default" : "outline"}
                      className="w-full justify-start h-auto p-4"
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="flex items-center gap-3">
                        {template.icon}
                        <span>{template.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Email Composition */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Recipient */}
                  <div className="space-y-2">
                    <Label htmlFor="recipient" className="text-sm font-medium text-gray-700">
                      To (Optional)
                    </Label>
                    <Input
                      id="recipient"
                      type="email"
                      placeholder="recipient@example.com"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Enter email subject..."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                      Email Content *
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Write your email content here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full min-h-[300px] font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500">
                      Use [placeholders] for dynamic content. Line breaks will be preserved in the final HTML.
                    </p>
                  </div>

                  {/* Preview */}
                  {content && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Preview
                      </Label>
                      <div className="bg-gray-50 p-4 rounded-lg border max-h-40 overflow-y-auto">
                        <div className="text-sm whitespace-pre-wrap">{content}</div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <Button
                    onClick={handleSaveEmail}
                    disabled={isLoading || !subject.trim() || !content.trim()}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving Email...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Save Email as HTML
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailComposer;
