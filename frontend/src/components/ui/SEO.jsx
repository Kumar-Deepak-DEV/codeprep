import React from "react";
import { Helmet } from "react-helmet-async";

function SEO({
  title,
  description = "CodePrep is an intelligent DSA practice and competitive programming progress tracking platform that guides you on what to practice next.",
  keywords = "DSA, LeetCode, Codeforces, Data Structures, Algorithms, Coding Interview Prep, Problem Recommendations, Spaced Repetition",
  type = "website",
  name = "CodePrep"
}) {
  const fullTitle = title
    ? `${title} | CodePrep — DSA Progress & Practice`
    : "CodePrep — DSA Progress Tracking & Personalized Practice Companion";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="CodePrep" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

export default SEO;
