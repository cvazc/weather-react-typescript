import { useState, ChangeEvent, FormEvent } from "react"
import type { SearchType } from "../../types"
import { countries } from "../../data/countries"
import styles from "./Form.module.css"
import Alert from "./Alert/Alert"
 
type FormProps = {
    fetchWeather : (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather} : FormProps) {
    const [search, setSearch] = useState<SearchType>({
        city: "",
        country: "",
    })

    const [alert, setAlert] = useState("")

    const handleChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        setSearch({
            ...search,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (Object.values(search).includes("")) {
            setAlert("Todos los campos son obligatorios")
            return
        }

        fetchWeather(search)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={search.city}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select
                    name="country"
                    id="country"
                    value={search.country}
                    onChange={handleChange}
                >
                    <option value="">-- SELECCIONAR PAÍS --</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input
                type="submit"
                value="Consultar Clima"
                className={styles.submit}
            />
        </form>
    )
}
