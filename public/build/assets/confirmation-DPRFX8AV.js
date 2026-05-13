import{a as e,n as t,t as n}from"./jsx-runtime-DQh8jqAR.js";import{t as r}from"./clock-B2cwSM5c.js";import{t as i}from"./download-BTQJlwTO.js";import{t as a}from"./eye-b_1mGoIx.js";import{t as o}from"./file-check-goWyMn9-.js";import{t as s}from"./house-9h54k0TM.js";import{n as c,r as l,t as u}from"./voting-progress-SpG3ABdN.js";import{t as d}from"./message-square-c9tY68nT.js";import{t as f}from"./printer-D-zURTyn.js";import{d as p,o as m}from"./app-DFiWVOci.js";import{t as h}from"./button-BrK0XPbY.js";import{t as g}from"./separator-dQEmSWtA.js";import{t as _}from"./voting-9buGX3hm.js";import{a as v,n as y,o as b,t as x}from"./card-D9qN6DJA.js";import{t as S}from"./format-BYJVEyx7.js";import{a as C,n as w,o as T,r as E,t as D}from"./item-DqDbJkxP.js";var O=n();function k({votes:e,electionName:t,timestamp:n,referenceId:r}){return(0,O.jsxs)(h,{onClick:()=>{let i=window.open(``,``,`width=800,height=600`);if(!i)return;let a=`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Vote Receipt - ${t}</title>
                <style>
                    @media print {
                        @page { margin: 2cm; }
                        body { margin: 0; }
                    }
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 40px 20px;
                        color: #1f2937;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 3px solid #059669;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .logo {
                        width: 80px;
                        height: 80px;
                        margin: 0 auto 20px;
                    }
                    h1 {
                        color: #059669;
                        margin: 0;
                        font-size: 28px;
                    }
                    .subtitle {
                        color: #6b7280;
                        font-size: 14px;
                        margin-top: 8px;
                    }
                    .info-box {
                        background: #f3f4f6;
                        border: 1px solid #d1d5db;
                        border-radius: 8px;
                        padding: 20px;
                        margin-bottom: 30px;
                    }
                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #e5e7eb;
                    }
                    .info-row:last-child {
                        border-bottom: none;
                        margin-bottom: 0;
                    }
                    .info-label {
                        font-weight: 600;
                        color: #374151;
                    }
                    .info-value {
                        color: #6b7280;
                    }
                    .votes-section {
                        margin-bottom: 30px;
                    }
                    .vote-item {
                        border: 1px solid #d1d5db;
                        border-radius: 8px;
                        padding: 15px;
                        margin-bottom: 15px;
                        background: white;
                    }
                    .position-name {
                        font-weight: 700;
                        color: #059669;
                        font-size: 16px;
                        margin-bottom: 8px;
                    }
                    .candidate-name {
                        font-size: 18px;
                        font-weight: 600;
                        color: #1f2937;
                        margin-bottom: 4px;
                    }
                    .partylist {
                        color: #6b7280;
                        font-size: 14px;
                        font-style: italic;
                    }
                    .footer {
                        text-align: center;
                        padding-top: 30px;
                        border-top: 2px solid #e5e7eb;
                        color: #6b7280;
                        font-size: 12px;
                    }
                    .security-notice {
                        background: #fef3c7;
                        border: 1px solid #fde68a;
                        border-radius: 8px;
                        padding: 15px;
                        margin: 20px 0;
                        font-size: 13px;
                        color: #78350f;
                    }
                    .watermark {
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(-45deg);
                        font-size: 120px;
                        color: rgba(5, 150, 105, 0.05);
                        font-weight: bold;
                        z-index: -1;
                        pointer-events: none;
                    }
                </style>
            </head>
            <body>
                <div class="watermark">OFFICIAL</div>
                
                <div class="header">
                    <div class="logo">
                        <svg viewBox="0 0 100 100" fill="#059669">
                            <circle cx="50" cy="50" r="45" />
                            <path d="M 30 50 L 45 65 L 70 35" stroke="white" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h1>Official Vote Receipt</h1>
                    <div class="subtitle">${t}</div>
                </div>

                <div class="info-box">
                    <div class="info-row">
                        <span class="info-label">Reference ID:</span>
                        <span class="info-value"><strong>${r}</strong></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Date & Time:</span>
                        <span class="info-value">${new Date(n).toLocaleString()}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Total Votes Cast:</span>
                        <span class="info-value">${e.length} position${e.length===1?``:`s`}</span>
                    </div>
                </div>

                <div class="security-notice">
                    <strong>⚠️ Security Notice:</strong> Your vote has been encrypted and anonymized. 
                    This receipt is for your records only and cannot be used to verify or change your vote.
                </div>

                <div class="votes-section">
                    <h2 style="color: #059669; margin-bottom: 20px;">Your Selections</h2>
                    ${e.map(e=>`
                        <div class="vote-item">
                            <div class="position-name">${e.position}</div>
                            <div class="candidate-name">${e.candidate}</div>
                            ${e.partylist?`<div class="partylist">${e.partylist}</div>`:``}
                        </div>
                    `).join(``)}
                </div>

                <div class="footer">
                    <p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p>
                    <p style="margin-top: 15px;">This is an official computer-generated receipt. No signature is required.</p>
                    <p style="margin-top: 5px;">For inquiries, please contact the election administrator.</p>
                </div>
            </body>
            </html>
        `;i.document.write(a),i.document.close(),i.focus(),setTimeout(()=>{i.print(),i.close()},250)},variant:`outline`,className:`border-2`,children:[(0,O.jsx)(f,{className:`mr-2 h-4 w-4`}),`Print Receipt`]})}function A({votes:e,electionName:t,timestamp:n,referenceId:r}){return(0,O.jsxs)(x,{className:`border-gray-200 dark:border-gray-800 print:shadow-none`,children:[(0,O.jsxs)(v,{className:`border-b border-gray-200 text-center dark:border-gray-800`,children:[(0,O.jsx)(b,{className:`text-xl text-gray-900 dark:text-gray-100`,children:`Vote Confirmation Receipt`}),(0,O.jsxs)(`p`,{className:`text-sm text-muted-foreground`,children:[`"`,t,`"`]})]}),(0,O.jsxs)(y,{className:`space-y-6 pt-6`,children:[(0,O.jsxs)(`div`,{className:`grid grid-cols-2 gap-4 text-sm`,children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`p`,{className:`text-muted-foreground`,children:`Reference ID`}),(0,O.jsx)(`p`,{className:`font-mono font-semibold text-gray-900 dark:text-gray-100`,children:r})]}),(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`p`,{className:`text-muted-foreground`,children:`Submitted At`}),(0,O.jsx)(`p`,{className:`font-semibold text-gray-900 dark:text-gray-100`,children:S(new Date(n),`MMM dd, yyyy hh:mm a`)})]})]}),(0,O.jsx)(g,{}),(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`h3`,{className:`mb-3 font-semibold text-gray-900 dark:text-gray-100`,children:`Your Selections`}),(0,O.jsx)(`div`,{className:`space-y-3`,children:e.map((e,t)=>(0,O.jsxs)(`div`,{className:`flex items-start gap-3 rounded-lg bg-muted/50 p-3 dark:bg-gray-800/50`,children:[(0,O.jsx)(`div`,{className:`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white dark:bg-green-700`,children:t+1}),(0,O.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,O.jsx)(`div`,{className:`text-xs text-muted-foreground`,children:e.position}),(0,O.jsx)(`div`,{className:`truncate text-sm font-semibold text-gray-900 dark:text-gray-100`,children:e.candidate}),e.partylist&&(0,O.jsx)(`div`,{className:`text-xs text-green-600 dark:text-green-400`,children:e.partylist})]})]},t))})]}),(0,O.jsx)(g,{}),(0,O.jsxs)(`div`,{className:`space-y-1 text-center text-xs text-muted-foreground`,children:[(0,O.jsx)(`p`,{children:`This is your vote confirmation receipt.`}),(0,O.jsx)(`p`,{className:`font-semibold text-gray-900 dark:text-gray-100`,children:`Your vote has been securely recorded and cannot be changed.`})]}),(0,O.jsxs)(`div`,{className:`flex gap-2 print:hidden`,children:[(0,O.jsxs)(h,{variant:`outline`,onClick:()=>{let e=_.receipt.url()+`?ref=${r}`;window.open(e,`_blank`)},className:`flex-1`,children:[(0,O.jsx)(f,{className:`mr-2 h-4 w-4`}),`Print Receipt`]}),(0,O.jsxs)(h,{variant:`outline`,onClick:()=>{let e=_.receipt.url()+`?ref=${r}`;window.open(e,`_blank`)},className:`flex-1`,children:[(0,O.jsx)(i,{className:`mr-2 h-4 w-4`}),`Save as PDF`]})]})]})]})}var j=e(t(),1);function M({votes:e=[],election:t,referenceId:n=`REF-${Date.now().toString(36).toUpperCase()}`,timestamp:i=new Date().toISOString(),feedbackToken:f}){return(0,j.useEffect)(()=>{if(t?.id)try{let e=`voting_draft_${t.id}`;localStorage.removeItem(e)}catch{}},[t?.id]),(0,O.jsxs)(`div`,{className:`flex min-h-screen items-center justify-center bg-linear-to-br from-primary/5 via-background to-background px-4 py-12`,children:[(0,O.jsxs)(`div`,{className:`w-full max-w-3xl`,children:[(0,O.jsxs)(`div`,{className:`mb-8 text-center`,children:[(0,O.jsx)(`div`,{className:`inline-block`,children:(0,O.jsxs)(`div`,{className:`relative`,children:[(0,O.jsx)(`div`,{className:`animate-bounce-slow mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-primary/80 to-primary shadow-2xl`,children:(0,O.jsx)(m,{className:`h-16 w-16 text-primary-foreground`,strokeWidth:2.5})}),(0,O.jsx)(`div`,{className:`absolute inset-0 mx-auto h-32 w-32 animate-ping rounded-full bg-primary opacity-20`})]})}),(0,O.jsx)(`h1`,{className:`mt-8 mb-3 text-4xl font-bold text-foreground`,children:`Vote Submitted Successfully!`}),(0,O.jsx)(`p`,{className:`mx-auto max-w-md text-lg text-muted-foreground`,children:`Thank you for participating in the democratic process. Your vote has been securely recorded and encrypted.`})]}),(0,O.jsx)(u,{currentStep:4}),(0,O.jsx)(`div`,{className:`mb-6`,children:(0,O.jsx)(c,{message:`Your vote has been encrypted and securely stored. You have been automatically logged out for security.`})}),e.length>0&&t&&(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(`div`,{className:`mb-6`,children:(0,O.jsx)(A,{votes:e,electionName:t.name,timestamp:i,referenceId:n})}),(0,O.jsx)(`div`,{className:`mb-6 flex justify-center`,children:(0,O.jsx)(k,{votes:e,electionName:t.name,timestamp:i,referenceId:n})})]}),(0,O.jsx)(x,{className:`mb-6 border-primary/30 bg-linear-to-r from-primary/5 to-primary/10`,children:(0,O.jsx)(y,{className:`p-6`,children:(0,O.jsxs)(`div`,{className:`grid grid-cols-2 gap-4 text-center md:grid-cols-3`,children:[(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`div`,{className:`text-3xl font-bold text-primary`,children:e.length}),(0,O.jsx)(`div`,{className:`mt-1 text-xs text-muted-foreground`,children:`Positions Voted`})]}),(0,O.jsxs)(`div`,{children:[(0,O.jsx)(`div`,{className:`text-3xl font-bold text-primary`,children:`✓`}),(0,O.jsx)(`div`,{className:`mt-1 text-xs text-muted-foreground`,children:`Encrypted`})]}),(0,O.jsxs)(`div`,{className:`col-span-2 md:col-span-1`,children:[(0,O.jsx)(`div`,{className:`text-3xl font-bold text-primary`,children:`100%`}),(0,O.jsx)(`div`,{className:`mt-1 text-xs text-muted-foreground`,children:`Secure`})]})]})})}),(0,O.jsxs)(`div`,{className:`mb-6`,children:[(0,O.jsxs)(`h3`,{className:`mb-3 flex items-center gap-2 text-lg font-semibold text-foreground`,children:[(0,O.jsx)(o,{className:`h-5 w-5 text-info`}),`What happens next?`]}),(0,O.jsxs)(`div`,{className:`space-y-2`,children:[(0,O.jsxs)(D,{variant:`outline`,className:`border-info/30 bg-info/5`,children:[(0,O.jsx)(C,{children:(0,O.jsx)(`div`,{className:`flex h-10 w-10 items-center justify-center rounded-full bg-info/10`,children:(0,O.jsx)(m,{className:`h-5 w-5 text-info`})})}),(0,O.jsxs)(w,{children:[(0,O.jsx)(T,{className:`text-foreground`,children:`Vote Counted`}),(0,O.jsx)(E,{className:`text-muted-foreground`,children:`Your vote is now part of the official count`})]})]}),(0,O.jsxs)(D,{variant:`outline`,className:`border-primary/30 bg-primary/5`,children:[(0,O.jsx)(C,{children:(0,O.jsx)(`div`,{className:`flex h-10 w-10 items-center justify-center rounded-full bg-primary/10`,children:(0,O.jsx)(l,{className:`h-5 w-5 text-primary`})})}),(0,O.jsxs)(w,{children:[(0,O.jsx)(T,{className:`text-foreground`,children:`Secure Logout`}),(0,O.jsx)(E,{className:`text-muted-foreground`,children:`You have been automatically logged out for security`})]})]}),(0,O.jsxs)(D,{variant:`outline`,className:`border-warning/30 bg-warning/5`,children:[(0,O.jsx)(C,{children:(0,O.jsx)(`div`,{className:`flex h-10 w-10 items-center justify-center rounded-full bg-warning/10`,children:(0,O.jsx)(r,{className:`h-5 w-5 text-warning`})})}),(0,O.jsxs)(w,{children:[(0,O.jsx)(T,{className:`text-foreground`,children:`Results Pending`}),(0,O.jsx)(E,{className:`text-muted-foreground`,children:`Results will be available after the election closes`})]})]}),(0,O.jsxs)(D,{variant:`outline`,className:`border-accent/30 bg-accent/5`,children:[(0,O.jsx)(C,{children:(0,O.jsx)(`div`,{className:`flex h-10 w-10 items-center justify-center rounded-full bg-accent/10`,children:(0,O.jsx)(o,{className:`h-5 w-5 text-accent-foreground`})})}),(0,O.jsxs)(w,{children:[(0,O.jsx)(T,{className:`text-foreground`,children:`Reference ID`}),(0,O.jsx)(E,{className:`text-muted-foreground`,children:`Keep your reference ID for verification purposes`})]})]})]})]}),(0,O.jsxs)(`div`,{className:t?`mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2`:`mb-4 flex justify-center`,children:[t&&(0,O.jsx)(p,{href:_.results.url({election:t.id}),children:(0,O.jsxs)(h,{className:`w-full bg-linear-to-r from-primary to-primary/80 shadow-lg hover:from-primary/90 hover:to-primary/70`,children:[(0,O.jsx)(a,{className:`mr-2 h-4 w-4`}),`View Election Results`]})}),(0,O.jsx)(p,{href:_.index.url(),children:(0,O.jsxs)(h,{variant:`outline`,className:t?`w-full border-2`:`border-2 px-8 py-6 text-lg`,children:[(0,O.jsx)(s,{className:`mr-2 h-4 w-4`}),`Back to Home`]})})]}),f&&(0,O.jsx)(`div`,{className:`flex justify-center`,children:(0,O.jsx)(p,{href:_.feedback.create.url()+`?token=${f}`,children:(0,O.jsxs)(h,{className:`bg-linear-to-r from-info to-info/80 px-8 py-6 text-lg shadow-lg hover:from-info/90 hover:to-info/70`,children:[(0,O.jsx)(d,{className:`mr-2 h-5 w-5`}),`Share Your Feedback`]})})}),(0,O.jsx)(`div`,{className:`mt-8 text-center`,children:(0,O.jsxs)(`p`,{className:`text-sm text-muted-foreground`,children:[`Questions or concerns?`,` `,(0,O.jsx)(`a`,{href:`mailto:support@example.com`,className:`font-medium text-primary hover:underline`,children:`Contact the election administrator`})]})})]}),(0,O.jsx)(`style`,{children:`
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
            `})]})}export{M as default};