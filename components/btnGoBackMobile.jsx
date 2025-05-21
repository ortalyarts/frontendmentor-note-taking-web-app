import Link from "next/link";

import IconArrowRight from "@/components/UI/iconArrowRight";

export default function BtnGoBackMobile({setContentToShow}){
    return(
            <Link href={`/user`} className='btn-goback-mobile' onClick={() => setContentToShow('notesList')}>
                <span className="icon-arrow"><IconArrowRight /></span>
                <span>Go Back</span>
            </Link>
    )
}