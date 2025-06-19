
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Mail, Database, FileText, Calendar, Award, DollarSign, Users, GraduationCap } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  content: string;
}

const EmailComposer = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('blank');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const templates: EmailTemplate[] = [
    {
      id: 'blank',
      name: 'Blank Email',
      icon: <FileText className="h-5 w-5" />,
      content: ''
    },
    {
      id: 'event-registration',
      name: 'Event Registration',
      icon: <Calendar className="h-5 w-5" />,
      content: `Subject: Registration Open for [Event Name] - [Club Name]

Dear Students,

We are excited to announce that registration is now open for [Event Name], organized by [Club Name].

Event Details:
• Event: [Event Name]
• Date: [Event Date]
• Time: [Event Time]
• Venue: [Event Venue]
• Registration Deadline: [Registration Deadline]

About the Event:
[Brief description of the event, its purpose, and what participants can expect to learn or gain from attending.]

Registration Requirements:
• Open to all students of [College Name]
• Registration fee: [Amount/Free]
• Limited seats available - First come, first served

How to Register:
1. Fill out the registration form: [Registration Link]
2. Submit required documents (if any)
3. Pay registration fee (if applicable)

For any queries, please contact:
[Organizer Name] - [Contact Number]
[Email ID]

Don't miss this opportunity to enhance your skills and network with fellow students!

Best regards,
[Club Name] Team
[College Name]`
    },
    {
      id: 'event-invitation',
      name: 'Event Invitation',
      icon: <Users className="h-5 w-5" />,
      content: `Subject: You're Invited! [Event Name] by [Club Name]

Dear [Recipient Name],

It is our pleasure to invite you to [Event Name], an exciting initiative by [Club Name] at [College Name].

Event Highlights:
• Theme: [Event Theme]
• Date & Time: [Date] at [Time]
• Venue: [Venue Details]
• Duration: [Duration]

Special Features:
• Guest Speaker: [Speaker Name & Credentials]
• Interactive workshops
• Networking opportunities
• Certificate of participation
• Refreshments will be provided

This event promises to be an enriching experience that will provide valuable insights into [Event Topic/Field]. We believe your presence would add great value to the discussions and interactions.

RSVP Details:
Please confirm your attendance by [RSVP Date] by replying to this email or contacting us at [Contact Information].

We look forward to your gracious presence at this event.

Warm regards,

[Your Name]
[Your Position]
[Club Name]
[College Name]
[Contact Information]`
    },
    {
      id: 'certification',
      name: 'Certification Award',
      icon: <Award className="h-5 w-5" />,
      content: `Subject: Certificate of [Achievement Type] - [Recipient Name]

Dear [Recipient Name],

Congratulations! It gives us immense pleasure to inform you that you have been awarded the Certificate of [Achievement Type] for your outstanding performance in [Event/Competition/Course Name].

Achievement Details:
• Event/Program: [Event Name]
• Date of Achievement: [Date]
• Category: [Category/Level]
• Performance Score: [Score/Grade]
• Rank/Position: [Position if applicable]

Your dedication, hard work, and exceptional skills have been truly commendable. This achievement reflects your commitment to excellence and your potential for future success.

Certificate Collection:
• Collection Date: [Date]
• Time: [Time]
• Venue: [Location]
• Required Documents: [ID Proof/Other requirements]

Alternatively, if you prefer digital delivery, please confirm your email address, and we will send you a high-resolution digital certificate.

Once again, congratulations on this well-deserved recognition. We wish you continued success in all your future endeavors.

Best wishes,

[Your Name]
[Your Designation]
[Department/Club Name]
[College Name]
[Contact Information]`
    },
    {
      id: 'sponsorship',
      name: 'Sponsorship Request',
      icon: <DollarSign className="h-5 w-5" />,
      content: `Subject: Sponsorship Proposal for [Event Name] - [College Name]

Dear [Company/Organization Name],

Greetings from [Club Name], [College Name]!

We are writing to invite your esteemed organization to be a sponsor for our upcoming event "[Event Name]" scheduled for [Event Date].

About Our Event:
[Event Name] is [brief description of the event, its significance, and objectives]. This event aims to [purpose and goals of the event].

Event Details:
• Date: [Event Date]
• Duration: [Duration]
• Expected Attendance: [Number] students and faculty
• Target Audience: [Describe audience - students, professionals, etc.]
• Venue: [Venue Details]

Why Partner With Us?

Brand Visibility:
• Logo placement on all promotional materials
• Banners and standees at the event venue
• Social media promotion across our platforms
• Mention in press releases and media coverage

Networking Opportunities:
• Direct interaction with talented students
• Potential recruitment opportunities
• Association with academic excellence

Community Impact:
• Support education and student development
• Contribute to skill enhancement initiatives
• Build long-term relationships with the academic community

Sponsorship Packages:
[Briefly mention different sponsorship tiers and benefits]

We would be honored to have [Company Name] as our partner in this endeavor. We are confident that this collaboration will be mutually beneficial and look forward to a long-term association.

We would appreciate the opportunity to discuss this proposal further at your convenience. Please let us know your availability for a meeting.

Thank you for considering our request. We eagerly await your positive response.

Warm regards,

[Your Name]
[Your Position]
[Club Name]
[College Name]
[Contact Information]
[Email Address]

Attachments: [Event Proposal Document, Sponsorship Brochure]`
    },
    {
      id: 'club-recruitment',
      name: 'Club Recruitment',
      icon: <GraduationCap className="h-5 w-5" />,
      content: `Subject: Join [Club Name] - Applications Open for New Members!

Dear Fellow Students,

Are you passionate about [Club's Focus Area]? Do you want to develop your skills, network with like-minded peers, and make a meaningful impact on campus?

[Club Name] is now recruiting new members for the academic year [Year]!

About [Club Name]:
[Brief description of the club, its mission, vision, and activities]. Since our establishment in [Year], we have been committed to [club's main objectives and achievements].

What We Offer:
• Skill Development: Workshops, training sessions, and hands-on experience
• Leadership Opportunities: Take on roles and lead initiatives
• Networking: Connect with alumni, industry professionals, and peers
• Experience: Organize events, competitions, and community service projects
• Recognition: Certificates, awards, and portfolio enhancement

Membership Benefits:
• Access to exclusive events and workshops
• Mentorship from senior members and alumni
• Opportunity to represent the college in competitions
• Professional development and career guidance
• Fun and engaging social activities

Eligibility Criteria:
• Currently enrolled student at [College Name]
• Minimum GPA requirement: [GPA if applicable]
• Passion for [Club's Focus Area]
• Commitment to active participation

Application Process:
1. Fill out the membership application form: [Application Link]
2. Submit a brief statement of interest (200-300 words)
3. Attend the information session on [Date & Time]
4. Complete the interview process (if shortlisted)

Important Dates:
• Application Deadline: [Date]
• Information Session: [Date & Time, Venue]
• Interview Dates: [Date Range]
• Results Announcement: [Date]

Ready to be part of something amazing? Apply now and embark on a journey of growth, learning, and impact!

For any questions, contact us at:
[Contact Email]
[Contact Number]
[Social Media Handles]

We look forward to welcoming you to the [Club Name] family!

Best regards,

[Your Name]
[Your Position]
[Club Name]
[College Name]`
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setContent(template.content);
    }
  };

  const convertToHTML = (plainText: string) => {
    // Convert plain text to HTML with proper formatting
    const htmlContent = plainText
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/\[(.*?)\]/g, '<strong>[$1]</strong>')
      .replace(/•/g, '&bull;');
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>College Email</title>
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
        ul {
            padding-left: 20px;
        }
        li {
            margin-bottom: 8px;
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
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please write some content for your email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const htmlContent = convertToHTML(content);
      
      const emailData = {
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
        setContent('');
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
              College Email Composer
            </CardTitle>
            <p className="text-lg text-gray-600 mt-2">
              Create professional college emails with ready-to-use templates
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
                        <span className="text-sm">{template.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Email Composition */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                      Email Content *
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Write your email content here or select a template to get started..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full min-h-[400px] font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500">
                      Use [placeholders] for dynamic content. Subject line is included in the template content.
                    </p>
                  </div>

                  {/* Preview */}
                  {content && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Preview
                      </Label>
                      <div className="bg-gray-50 p-4 rounded-lg border max-h-60 overflow-y-auto">
                        <div className="text-sm whitespace-pre-wrap">{content}</div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <Button
                    onClick={handleSaveEmail}
                    disabled={isLoading || !content.trim()}
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
