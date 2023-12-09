import React from 'react'
import Loading from '../Loading'

const CategoryModal = ({ mode, selected, loading, handleClick, removeSelectedCategory, updateValue, setUpdateValue }) => {
    return (
        <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel"> {mode == "edit" ? "Update" : "Delete"} Category</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {mode == "delete" && <p>Are you sure to delete this category- <i> <b> {selected?.name}</b> </i>? </p>}
                        {mode == "edit" && (
                            <form onSubmit={(e) => { e.preventDefault(); handleClick() }}>
                                <input type="text" value={updateValue} onChange={e => setUpdateValue(e.target.value)} placeholder='Category name' className='form-control' />
                            </form>
                        )}
                    </div>
                    <div className="modal-footer">
                        {loading ? <Loading /> : (
                            <>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={removeSelectedCategory}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleClick}>
                                    {mode == "edit" ? "Update" : "Delete"} Category
                                </button>
                            </>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryModal