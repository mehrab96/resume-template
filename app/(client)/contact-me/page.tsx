import React from 'react'

const ContactMePage = () => {
  return (
    <main>
        <div className="highlight">
            <span className="font-black text-xl text-primary-active relative">
                Contact Me
            </span>
            <form className="grid grid-cols-2 gap-8 mt-8">        
            <div className="grid grid-cols-1 max-sm:col-span-2 relative">
                <label className="font-light text-primary-active/90 text-sm px-2">            
                    <span>Fullname</span>
                </label>
                <input className="focus:outline-0 placeholder-font-extralight focus:ring-0
                focus:border-gray-300/20 p-4 mt-2 h-14 rounded-xl text-sm border-gray-300/20 bg-gray-200/20"
                type="text" placeholder="Please enter your fullname" />        
            </div>
            <div className="grid grid-cols-1 max-sm:col-span-2 relative">
                <label className="font-light text-primary-active/90 text-sm px-2">
                    <span>Email</span>
                </label>
                <input className="focus:outline-0 placeholder-font-extralight focus:ring-0
                focus:border-gray-300/20 p-4 mt-2 h-14 rounded-xl text-sm border-gray-300/20 bg-gray-200/20" type="email" placeholder="Please enter your email" />        
            </div>
            <div className="grid grid-cols-1 relative col-span-2">
                <label className="font-light text-primary-active/90 text-sm px-2">
                    <span>Message</span>
                </label>
                <textarea className="focus:outline-0 placeholder-font-extralight focus:ring-0 focus:border-gray-300/20
                p-4 mt-2 rounded-xl text-sm border-gray-300/20 bg-gray-200/20 h-96 resize-none"
                placeholder="Please enter your message"></textarea>
            </div>
            <div className="grid col-span-2 justify-center">
                <button className="bg-primary-active/10 rounded-full px-12 py-2 text-primary-active font-semibold">                
                    <span className="w-full h-full font-semibold">Send Message</span>
                </button>
            </div>
        </form>
        </div>
    </main>
  )
}

export default ContactMePage