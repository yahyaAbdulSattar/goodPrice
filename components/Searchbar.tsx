'use client'

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"

const isValidAmazonProductUrl = (url: string) => {
        try {
            const parsedURL = new URL(url);
            const hostname = parsedURL.hostname;

            if(hostname.includes("amazon.com") || hostname.includes("amazon.") || hostname.endsWith("amazon")){
                return true;
            }
        } catch(e){
            return false;
        }

        return false;
    }


const Searchbar =  () => {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductUrl(searchPrompt);

        if(!isValidLink){
            return alert("Please Provide Valid Amazon Link");
        }

        try {
            setIsLoading(true);
            
            const product = await scrapeAndStoreProduct(searchPrompt);

        } catch (error) {
            
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter Product Link"
                className="searchbar-input"
                value={searchPrompt}
                onChange={(e)=>{
                    setSearchPrompt(e.target.value);
                }}
            />

            <button className="searchbar-btn" type="submit" disabled={searchPrompt === ''}>
                {isLoading ? "Searching..." : "Search"}
            </button>
        </form>
    )
}

export default Searchbar