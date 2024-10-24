import Image from "next/image";

const Header = () => {
    return (
        <header className="flex items-center p-6">
            <div className="flex items-center">
                <div className="rounded-full w-10 h-10">
                    <Image src="/ball-icon.svg" alt="ball" className="w-12 h-12" width={4} height={4}/>
                </div>
                <h1 className="ml-4 text-white text-2xl font-light">Fantasy Football</h1>
            </div>
        </header>
    );
};

export default Header;
