import React from 'react'
import Loading from '../Loading'

const CategoryForm = ({ handler, value, setValue, loading, setLoading }) => {
    return (
        <>
            <form className="row g-5" onSubmit={handler}>
                <div className="col-8">
                    <input type="text" value={value} onChange={e => setValue(e.target.value)} className="form-control"
                        placeholder='Type category name' disabled={loading} />
                </div>
                <div className="col-auto">
                    {loading ? <Loading /> :
                        <button type="submit" className="btn btn-primary mb-3" disabled={loading} >
                            Add Category
                        </button>
                    }
                </div>
            </form>
        </>
    )
}

export default CategoryForm