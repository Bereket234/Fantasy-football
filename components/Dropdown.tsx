interface DropdownProps {
    label: string;
    options: string[];
    onChange: (value: string) => void;
}

const Dropdown = ({ label, options, onChange }: DropdownProps) => {
    return (
        <div className="mb-4">
            <select
                onChange={(e) => onChange(e.target.value)}
                className="rounded-lg p-4 w-full bg-black text-white text-xl font-light"
            >
                <option value={""}>{label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
