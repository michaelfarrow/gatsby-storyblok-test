import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/test-image"
import SEO from "../components/seo"
import Debug from "../components/debug"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ width: `50%`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <Debug/>
  </Layout>
)

export default IndexPage
