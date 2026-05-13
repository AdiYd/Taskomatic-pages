import { FOOTER, SITE_NAME } from "@/lib/constants"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-2">{SITE_NAME}</h3>
            <p className="text-sm text-slate-600">{FOOTER.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">ניווט</h4>
            <ul className="space-y-2">
              {FOOTER.links.slice(0, 3).map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">חוקי</h4>
            <ul className="space-y-2">
              {FOOTER.links.slice(3).map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">עקבו אחרינו</h4>
            <ul className="space-y-2">
              {FOOTER.social.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <p className="text-center text-sm text-slate-600">
            © {currentYear} {SITE_NAME}. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  )
}
