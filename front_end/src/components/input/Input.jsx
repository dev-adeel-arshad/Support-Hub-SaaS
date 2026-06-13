
export default function Input({
    label,
    type="text",
    placeholder,
    register,
    error
}){
    
    return(
        <div>
            <label>{label}</label>
            <input
             type={type}
             placeholder={placeholder}
             {...register}
             />
              {error && (
                <p>{error.message}</p>
            )}
        </div>
    )

}