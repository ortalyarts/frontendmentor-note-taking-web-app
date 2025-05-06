import Link from "next/link";
import IconTag from "./UI/iconTag.jsx";
import IconArrowRight from "./UI/iconArrowRight.jsx";

export default function AllTags({tags, activeTag}) {
    return(
        <>
        <h2 className="text-4 title-tags">Tags</h2>
        <ul className="tags-list">
            {tags.map((tag, index) => (
                <li key={index}>
                    <Link href={`/user?tag=${tag}`} className={`text-4  ${activeTag === tag ? 'active' : ''}`}>
                        <span className="icon-tag"><IconTag /></span>
                        {tag}
                        <span className="icon-arrow"><IconArrowRight /></span>
                    </Link>
                </li>
            ))}
        </ul>
        </>
    )
}