import IconArrowRight from "@/components/UI/iconArrowRight";

export default function BtnBackToSettings({setActiveSetting}){
    return(
            <button className='btn-goback-mobile' onClick={() => setActiveSetting('settingsTitles')}>
                <span className="icon-arrow"><IconArrowRight /></span>
                <span>Settings</span>
            </button>
    )
}