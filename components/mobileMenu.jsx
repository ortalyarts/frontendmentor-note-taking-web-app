import Link from "next/link";

import IconArchive from "@/components/UI/iconArchive";
import IconHome from "@/components/UI/iconHome";
import IconSettings from "@/components/UI/iconSettings";
import IconSearch from "@/components/UI/iconSearch";
import IconTag from "@/components/UI/iconTag";

export default function MobileMenu({setContentToShow, contentToshow}){
    return(
        <div className="mobile-menu">
            <ul>
                <li>
                    <Link href={`/user`} className={`btn-mobile-nav ${contentToshow === "notesList" ? "active" : ''}`} onClick={() => setContentToShow('notesList')}>
                        <IconHome />
                        <span className="nav-title">Home</span>
                    </Link>
                </li>
                <li>
                    <Link href={`/user`} className={`btn-mobile-nav ${contentToshow === "search" ? "active" : ''}`} onClick={() => setContentToShow('search')}>
                        <IconSearch />
                        <span className="nav-title">Search</span>
                    </Link>
                </li>
                <li>
                    <Link href={`/user?archived=true`} className={`btn-mobile-nav ${contentToshow === "archived" ? "active" : ''}`} onClick={() => setContentToShow('archived')}>
                        <IconArchive />
                        <span className="nav-title">Archived</span>
                    </Link>                    
                </li>
                <li>
                    <Link href={`/user`} className={`btn-mobile-nav ${contentToshow === "tags" ? "active" : ''}`} onClick={() => setContentToShow('tags')}>
                        <IconTag />
                        <span className="nav-title">Tags</span>
                    </Link>
                </li>
                <li>
                    <Link href={`/settings`} className={`btn-mobile-nav ${contentToshow === "settings" ? "active" : ''}`} onClick={() => setContentToShow('settings')}>
                        <IconSettings />
                        <span className="nav-title">Settings</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}