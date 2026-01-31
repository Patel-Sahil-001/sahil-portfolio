import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-center flex items-center gap-2">
            Made with <Heart className="h-4 w-4 text-foreground animate-pulse" /> by Patel Sahil
          </p>
          <p className="text-sm text-muted-foreground/70">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
