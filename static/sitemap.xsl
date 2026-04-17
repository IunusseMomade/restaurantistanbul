<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap</title>
        <style>
          :root {
            --bg: #f6f7fb;
            --card: #ffffff;
            --text: #1d2433;
            --muted: #5f6b85;
            --border: #e3e7f0;
            --accent: #0a66c2;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            color: var(--text);
            background: radial-gradient(circle at top right, #e9f2ff 0%, var(--bg) 45%);
          }
          .wrap {
            max-width: 1200px;
            margin: 32px auto;
            padding: 0 16px;
          }
          .card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(10, 18, 40, 0.06);
            overflow: hidden;
          }
          .head {
            padding: 20px;
            border-bottom: 1px solid var(--border);
          }
          .head h1 {
            margin: 0 0 6px;
            font-size: 24px;
          }
          .head p {
            margin: 0;
            color: var(--muted);
            font-size: 14px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
          }
          thead th {
            text-align: left;
            background: #f9fbff;
            color: #2d3750;
            border-bottom: 1px solid var(--border);
            padding: 12px;
            position: sticky;
            top: 0;
          }
          tbody td {
            border-bottom: 1px solid var(--border);
            padding: 10px 12px;
            vertical-align: top;
          }
          tbody tr:hover { background: #fcfdff; }
          a {
            color: var(--accent);
            text-decoration: none;
            word-break: break-all;
          }
          a:hover { text-decoration: underline; }
          .small { color: var(--muted); font-size: 12px; }
          .alts {
            margin: 0;
            padding-left: 18px;
          }
          .alts li { margin: 2px 0; }
          .empty { color: var(--muted); }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="card">
            <div class="head">
              <h1>XML Sitemap</h1>
              <p>
                Total URLs:
                <strong><xsl:value-of select="count(s:urlset/s:url)"/></strong>
              </p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Last Modified</th>
                  <th>Change Frequency</th>
                  <th>Priority</th>
                  <th>Alternates (hreflang)</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="s:urlset/s:url">
                  <tr>
                    <td>
                      <a>
                        <xsl:attribute name="href"><xsl:value-of select="s:loc"/></xsl:attribute>
                        <xsl:value-of select="s:loc"/>
                      </a>
                    </td>
                    <td><xsl:value-of select="s:lastmod"/></td>
                    <td><xsl:value-of select="s:changefreq"/></td>
                    <td><xsl:value-of select="s:priority"/></td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="count(xhtml:link) &gt; 0">
                          <ul class="alts">
                            <xsl:for-each select="xhtml:link">
                              <li>
                                <span class="small"><xsl:value-of select="@hreflang"/>:</span>
                                <xsl:text> </xsl:text>
                                <a>
                                  <xsl:attribute name="href"><xsl:value-of select="@href"/></xsl:attribute>
                                  <xsl:value-of select="@href"/>
                                </a>
                              </li>
                            </xsl:for-each>
                          </ul>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="empty">None</span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
