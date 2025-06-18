
import EmailGenerator from "@/components/EmailGenerator";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Mail } from "lucide-react";

const Index = () => {
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
      </div>
      
      <EmailGenerator />
    </div>
  );
};

export default Index;
