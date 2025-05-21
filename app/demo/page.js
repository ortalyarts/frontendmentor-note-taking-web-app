import IconTag from "@/components/UI/iconTag"
import IconClock from "@/components/UI/iconClock"
import IconArchive from "@/components/UI/iconArchive"
import IconDelete from "@/components/UI/IconDelete"

export default async function Demo(){
const text = 'Key performance optimization techniques:\n\n1. Code Splitting\n- Use React.lazy() for route-based splitting\n- Implement dynamic imports for heavy components\n\n2. Memoization\n- useMemo for expensive calculations\n- useCallback for function props\n- React.memo for component optimization\n\n3. Virtual List Implementation\n- Use react-window for long lists\n- Implement infinite scrolling\n\nTODO: Benchmark current application and identify bottlenecks'
    return (
        <>
            <form className="note-form">
                <div className="note">
                    <h2 className="text-1">
                    React Performance Optimization
                    </h2>
                    <div className="note-summary">
                        <p className="summary-category text-5"><IconTag /> Tags</p>
                        <div>
                            <p className="text-5">Dev, React</p>
                        </div>
                        <p className="summary-category text-5"><IconClock /> Last edited</p>
                        <span className="note-date text-5">29 Oct 2024</span>
                    </div>
                    <div className="note-content">
                        {text.split('\n').map((line, index) => (
                                <p key={index}>{line || <br />}</p>
                              ))}
                    </div>
                    <div className="note-buttons">
                        <button className="btn-main" type="button" disabled={false}>Save Note</button>
                        <button className="btn-grey" type="reset" disabled={false}>Cancel</button>

                    </div>
                </div>
        
                <div className="sidebar delete-archive-buttons">

                    <button className="btn-icon-outline" type="button" ><IconArchive />
                        <span>Archive Note</span>
                    </button>

                    <button className="btn-icon-outline" type="button" ><IconDelete /><span>Delete Note</span></button>
                </div>
            </form>
        </>
    )
}