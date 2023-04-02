import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

export default function Layout(props) {
  return (
    <div>
        <Helmet>
          <meta  charSet='utf-8'/>
          <title>{props.title}</title>
          <meta name="description" content={props.description} />
          <meta name="keywords" content={props.keywords} />
          <meta name="author" content={props.author} />
        </Helmet>
        <Header/>
        <div style={{minHeight:"72vh"}}>
        <Toaster />
        {props.children} 
        </div>
        <Footer/>
    </div>
  )
}

// default value props

Layout.defaultProps={
  title:"Ecommerce App - shop now",
  description:"mern stact project",
  keywords:"mern,react,node,mongodb",
  auther:"zubair"
}