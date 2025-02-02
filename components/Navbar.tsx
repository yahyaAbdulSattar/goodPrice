import Image from 'next/image'
import Link from 'next/link'

const navIcons = [
    {src: '/assets/icons/search.svg', alt: 'search'},
    {src: '/assets/icons/black-heart.svg', alt: 'heart'},
    {src: '/assets/icons/user.svg', alt: 'user'},
]


const Navbar = () => {
    return (
        <header className='w-full' >
            <nav className='nav'>
                <Link href='/' className='flex items-center gap-1'>

                    <Image
                        src='/assets/icons/logo.svg'
                        width={27}
                        height={27}
                        alt='logo'
                    />
                    <p className='nav-logo'>
                        good<span className='text-primary'>Price</span>
                    </p>

                    
                </Link>
                <div className='flex items-center gap-5'>
                        {navIcons.map((icon)=> (
                            <Image 
                                src={icon.src}
                                alt = {icon.alt}
                                key={icon.alt}
                                width={28}
                                height={28}
                            />
                        ))}
                    </div>



            </nav>
        </header>
    )
}

export default Navbar