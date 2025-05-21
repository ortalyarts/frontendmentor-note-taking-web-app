import Link from "next/link";
import IconTag from "./UI/iconTag.jsx";
import IconArrowRight from "./UI/iconArrowRight.jsx";

export default function AllTags({tags, activeTag, setContentToShow}) {
    return(
        <>
        <h2 className="text-4 title-tags" id="tags-title">Tags</h2>
        <ul className="tags-list" aria-describedby="tags-title">
            {tags.map((tag, index) => (
                <li key={index}>
                    <Link href={`/user?tag=${tag}`} className={`text-4  ${activeTag === tag ? 'active' : ''}`} onClick={() => setContentToShow('notesList')}>
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