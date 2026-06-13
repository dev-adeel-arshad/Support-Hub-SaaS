export default function Button({
children,
type="button",
disabled=false,
onClick,
}){
return(
    <div>
        <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        >
{children}
        </button>
    </div>
)}
