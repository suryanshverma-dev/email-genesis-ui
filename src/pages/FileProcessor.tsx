
import FileProcessor from "@/components/FileProcessor";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Mail, Send } from "lucide-react";

const FileProcessorPage = () => {
  return (
    <div>
      {/* Navigation Header */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        <Link to="/file-processor">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-lg">
            <Database className="h-4 w-4 mr-2" />
            File Processor
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-lg">
            <Mail className="h-4 w-4 mr-2" />
            Email Generator
          </Button>
        </Link>
        <Link to="/mail-sender">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm shadow-lg">
            <Send className="h-4 w-4 mr-2" />
            Send Mail
          </Button>
        </Link>
      </div>
      
      <FileProcessor />
    </div>
  );
};

export default FileProcessorPage;
