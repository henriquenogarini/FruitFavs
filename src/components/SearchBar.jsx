import { useFormik } from "formik";

export default function SearchBar({ onSearch }) {
    const formik = useFormik({
        initialValues: { mode: "name", query: "" },
        validate: (values) => {
            const errors = {};
            if (!values.query.trim()) errors.query = "Enter a value to search for";
            return errors;
        },
        onSubmit: async (values, helpers) => {
            try {
                helpers.setStatus(null);
                await onSearch(values);
            } catch (error) {
                helpers.setStatus({ apiError: error.message || "An error occurred" });
            } finally {
                helpers.setSubmitting(false);
            }
        },
    });

    const handleInputChange = (e) => {
        formik.handleChange(e);
        if (formik.status?.apiError) formik.setStatus(null);
    };

    return (
        <form className="toolbar" onSubmit={formik.handleSubmit} noValidate>
            <label className="sr-only" htmlFor="mode">Mode</label>
            <select 
                id="mode" 
                name="mode" 
                value={formik.values.mode} 
                onChange={(e) => {
                    formik.handleChange(e);
                    if (formik.status?.apiError) formik.setStatus(null);
                }}
            >
                <option value="name">Name</option>
                <option value="family">Family</option>
                <option value="genus">Genus</option>
                <option value="order">Order</option>
            </select>

            <label className="sr-only" htmlFor="query">Valor</label>
            <input
                id="query"
                name="query"
                placeholder="Banana, Apple, etc."
                value={formik.values.query}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                aria-invalid={Boolean(formik.touched.query && formik.errors.query)}
            />

            <button className="btn btn-primary" type="submit" disabled={formik.isSubmitting}>
                Search
            </button>

            {formik.touched.query && formik.errors.query && (
                <small className="error">{formik.errors.query}</small>
            )}

            {formik.status?.apiError && (
                <small className="error">{formik.status.apiError}</small>
            )}
        </form>
    );
}