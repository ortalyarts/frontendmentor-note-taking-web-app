'use client'

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'
import Link from "next/link";

import NotesList from "@/components/notesList";
import AllTags from "@/components/tags.jsx";
import IconArchive from "@/components/UI/iconArchive";
import IconArrowRight from "@/components/UI/iconArrowRight.jsx";
import IconHome from "@/components/UI/iconHome";
import IconSettings from "@/components/UI/iconSettings";
import Logo from "@/components/UI/logo";

export default function NoteLayout({ children, notes, uniqueTags }) {

    // filter notes by tag / archived / search
    const searchParams = useSearchParams()
    const router = useRouter()
  
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
    const tag = searchParams.get('tag')
    const archived = searchParams.get('archived')
    const q = searchParams.get('q')?.toLowerCase()

    // Filter logic
    const filteredNotes = notes.filter(note => {
      const tagMatch = tag ? note.tags?.includes(tag) : true
      const archivedMatch =
        archived === 'true' ? note.archived === true :
        archived === 'false' ? note.archived === false :
        true
  
      const searchMatch = q
        ? (
            note.title.toLowerCase().includes(q) ||
            note.content.toLowerCase().includes(q) ||
            note.tags?.toLowerCase().includes(q)
          )
        : true
  
      return tagMatch && archivedMatch && searchMatch
    })

    function handleSearch(e) {
        e.preventDefault()
        const params = new URLSearchParams(searchParams.toString())
        if (searchQuery) {
          params.set('q', searchQuery)
        } else {
          params.delete('q')
        }
        router.push(`/user?${params.toString()}`)
      }

    return(
        <main className="user-page">

        <aside className="sidebar">
            <div className="logo-holder">
                <Logo />
            </div>
            <Link href={`/user`} className={`btn-transparent  ${searchParams.size == 0 ? 'active' : ''}`}>
                <IconHome />
                <span>All Notes</span>
                <span className="icon-arrow"><IconArrowRight /></span>
            </Link>
            <Link href={`/user?archived=true`} className={`btn-transparent  ${archived ? 'active' : ''}`}>
                <IconArchive />
                <span>Archived Notes</span>
                <span className="icon-arrow"><IconArrowRight /></span>
            </Link>
            <div className="horizontal-line"></div>
            <AllTags tags={uniqueTags} activeTag={tag}/>
        </aside>
        <section className="right-holder">
            <div className="header-and-search">
                <header><h1 className="text-1">All Notes</h1></header>
                <div className="search-and-settings">
                    <form onSubmit={handleSearch}>
                        <label htmlFor="search" className="search-label">
                            <input type="text" className="search-input" id="search" placeholder="Search by title, content, or tags..." 
                                value={searchQuery}  onChange={e => setSearchQuery(e.target.value)} />
                            <span className="sr-only">Search</span>
                        </label>
                    </form>
                    <button className="btn-icon" type="button">
                        <IconSettings />
                    </button>
                </div>
            </div>
            <div className="tags-note-buttons">
                <aside className="sidebar">
                    <button className="btn-main" type="button">+ Create New Note</button>
                    <NotesList notes={filteredNotes}/>
                </aside>
                { children }
            </div>
        </section>
    </main>
    )
}