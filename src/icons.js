// Inline SVG icons & decorative illustrations (original artwork, no external assets).
// All icons use currentColor so they follow the surrounding text color.

const s = (body, vb = "0 0 48 48") =>
  `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const icons = {
  // WHY cards
  prompt: s(
    '<rect x="8" y="9" width="32" height="24" rx="6"/><path d="M16 19h10M16 25h6"/><path d="M18 33l-4 7 9-7"/><path d="M36 5l1.5 3 3 1.5-3 1.5L36 14l-1.5-3-3-1.5 3-1.5z" fill="currentColor" stroke-width="1"/>'
  ),
  face: s(
    '<path d="M12 18l-2-10 9 6M36 18l2-10-9 6"/><circle cx="24" cy="27" r="14"/><circle cx="19" cy="25" r="1.6" fill="currentColor"/><circle cx="29" cy="25" r="1.6" fill="currentColor"/><path d="M22 31c1 1 3 1 4 0"/><path d="M24 13v4" stroke-dasharray="1 3"/>'
  ),
  repeat: s('<path d="M38 20a15 15 0 0 0-27-5l-2 3"/><path d="M8 10v8h8"/><path d="M10 28a15 15 0 0 0 27 5l2-3"/><path d="M40 38v-8h-8"/>'),
  coins: s(
    '<ellipse cx="20" cy="14" rx="11" ry="5"/><path d="M9 14v8c0 3 5 5 11 5s11-2 11-5v-8"/><path d="M9 22v8c0 3 5 5 11 5 2 0 3.5-.2 5-.6"/><circle cx="34" cy="32" r="9"/><path d="M34 28v8M31 32h6"/>'
  ),
  scissors: s('<circle cx="13" cy="34" r="5"/><circle cx="13" cy="14" r="5"/><path d="M17 17l23 16M17 31l23-16"/>'),

  // WHAT IF cards
  dance: s('<path d="M18 36V12l18-4v24"/><circle cx="13" cy="36" r="5"/><circle cx="31" cy="32" r="5"/><path d="M18 18l18-4"/>'),
  talk: s(
    '<path d="M8 12a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5H22l-9 8v-8a5 5 0 0 1-5-5z"/><path d="M24 24s-6-3.5-6-7a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 3.5-6 7-6 7z" fill="currentColor" stroke-width="1.5"/>'
  ),
  cook: s(
    '<path d="M14 26a7 7 0 0 1 2-13 8 8 0 0 1 16 0 7 7 0 0 1 2 13"/><path d="M14 26v10h20V26"/><path d="M14 31h20"/>'
  ),
  adventure: s('<circle cx="24" cy="24" r="16"/><path d="M30 18l-4 8-8 4 4-8z" fill="currentColor" stroke-width="1.5"/><path d="M24 5v3M24 40v3M5 24h3M40 24h3"/>'),
  celebrate: s(
    '<rect x="9" y="24" width="30" height="16" rx="3"/><path d="M9 31c3 2 6 2 7.5 0s4.5-2 7.5 0 6 2 7.5 0 4.5-2 7.5 0"/><path d="M18 24v-6M30 24v-6M24 24v-7"/><path d="M18 14c-1-2 0-4 0-4s1 2 0 4zM24 13c-1-2 0-4 0-4s1 2 0 4zM30 14c-1-2 0-4 0-4s1 2 0 4z" fill="currentColor" stroke-width="1.5"/>'
  ),
  movie: s(
    '<rect x="7" y="18" width="34" height="22" rx="3"/><path d="M7 18l32-8 1.5 5.5L9 23"/><path d="M16 15.8l5 5M26 13.3l5 5"/><path d="M24 26l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="currentColor" stroke-width="1"/>'
  ),
  message: s(
    '<rect x="6" y="12" width="36" height="26" rx="4"/><path d="M6 15l18 13 18-13"/><path d="M36 6s-4-2.3-4-4.7a2 2 0 0 1 4-.6 2 2 0 0 1 4 .6C40 3.7 36 6 36 6z" transform="translate(-2 3)" fill="currentColor" stroke-width="1"/>'
  ),

  // UI
  play: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
  pause:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="6.5" y="5" width="4" height="14" rx="1.2" fill="currentColor"/><rect x="13.5" y="5" width="4" height="14" rx="1.2" fill="currentColor"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
  paw: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><ellipse cx="12" cy="16" rx="5" ry="4.2"/><ellipse cx="5.5" cy="10.5" rx="2.1" ry="2.7"/><ellipse cx="9.5" cy="6.5" rx="2.1" ry="2.8"/><ellipse cx="14.5" cy="6.5" rx="2.1" ry="2.8"/><ellipse cx="18.5" cy="10.5" rx="2.1" ry="2.7"/></svg>',
  sparkle:
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M12 1.5l2.3 7.2 7.2 2.3-7.2 2.3L12 20.5l-2.3-7.2L2.5 11l7.2-2.3z"/></svg>',
};

// ---------- Decorative illustrations ----------

export const cloud = (cls = "") =>
  `<svg class="deco-cloud ${cls}" viewBox="0 0 200 90" aria-hidden="true" focusable="false"><path d="M30 80a26 26 0 0 1 2-52 34 34 0 0 1 62-12 30 30 0 0 1 52 10 28 28 0 0 1 24 54z" fill="currentColor"/></svg>`;

export const star = (cls = "") =>
  `<svg class="deco-star ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 1.5l2.3 7.2 7.2 2.3-7.2 2.3L12 20.5l-2.3-7.2L2.5 11l7.2-2.3z" fill="currentColor"/></svg>`;

export const flower = (cls = "") =>
  `<svg class="deco-flower ${cls}" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><g fill="currentColor"><circle cx="20" cy="10" r="7"/><circle cx="30" cy="18" r="7"/><circle cx="26" cy="30" r="7"/><circle cx="14" cy="30" r="7"/><circle cx="10" cy="18" r="7"/></g><circle cx="20" cy="21" r="5" fill="#FFF3D6"/></svg>`;

// Original Mediterranean-style hilltop castle silhouette (round towers, domes, arched windows).
export const castle = (cls = "") => `
<svg class="deco-castle ${cls}" viewBox="0 0 600 224" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
  <g fill="currentColor">
    <rect x="170" y="130" width="260" height="90" rx="4"/>
    <rect x="150" y="96" width="44" height="124" rx="6"/>
    <path d="M146 100 Q172 50 198 100Z"/>
    <rect x="406" y="96" width="44" height="124" rx="6"/>
    <path d="M402 100 Q428 50 454 100Z"/>
    <rect x="262" y="70" width="76" height="150" rx="6"/>
    <path d="M256 74 Q300 -6 344 74Z"/>
    <rect x="297" y="16" width="6" height="22"/>
    <path d="M303 16 l16 5 -16 5z"/>
    <rect x="214" y="110" width="30" height="110" rx="4"/>
    <path d="M210 112 Q229 80 248 112Z"/>
    <rect x="356" y="110" width="30" height="110" rx="4"/>
    <path d="M352 112 Q371 80 390 112Z"/>
  </g>
  <g fill="#FFF8EE" opacity=".85">
    <path d="M292 120 a8 8 0 0 1 16 0 v18 h-16z"/>
    <path d="M166 130 a6 6 0 0 1 12 0 v12 h-12z"/>
    <path d="M422 130 a6 6 0 0 1 12 0 v12 h-12z"/>
    <path d="M288 220 v-26 a12 12 0 0 1 24 0 v26z"/>
    <circle cx="229" cy="140" r="4"/><circle cx="371" cy="140" r="4"/>
  </g>
</svg>`;

// Friendly placeholder pets for the sample-video cards (simple original shapes).
export const petArt = (type) => {
  const eyes =
    '<circle cx="84" cy="112" r="6" fill="#1F2F55"/><circle cx="116" cy="112" r="6" fill="#1F2F55"/><circle cx="86" cy="110" r="2" fill="#fff"/><circle cx="118" cy="110" r="2" fill="#fff"/>';
  const cheeks = '<ellipse cx="72" cy="126" rx="8" ry="5" fill="#F4AFC0" opacity=".8"/><ellipse cx="128" cy="126" rx="8" ry="5" fill="#F4AFC0" opacity=".8"/>';
  const mouth = '<path d="M94 124 q6 5 12 0" stroke="#1F2F55" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="120" rx="5" ry="3.5" fill="#1F2F55"/>';
  if (type === "cat") {
    // Cat with a chef hat
    return `<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <path d="M52 92 L60 44 L92 74Z M148 92 L140 44 L108 74Z" fill="#FFF8EE" stroke="#1F2F55" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="100" cy="115" r="52" fill="#FFF8EE" stroke="#1F2F55" stroke-width="3"/>
      <path d="M70 58 a18 18 0 0 1 12-28 22 22 0 0 1 36 0 18 18 0 0 1 12 28z" fill="#fff" stroke="#1F2F55" stroke-width="3" stroke-linejoin="round"/>
      <rect x="72" y="56" width="56" height="14" rx="4" fill="#fff" stroke="#1F2F55" stroke-width="3"/>
      ${eyes}${cheeks}${mouth}
      <path d="M50 118 h-18 M50 126 h-16 M150 118 h18 M150 126 h16" stroke="#1F2F55" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }
  if (type === "dog2") {
    // Dog with speech bubble
    return `<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <ellipse cx="54" cy="104" rx="18" ry="34" fill="#E9CFA8" stroke="#1F2F55" stroke-width="3" transform="rotate(18 54 104)"/>
      <ellipse cx="146" cy="104" rx="18" ry="34" fill="#E9CFA8" stroke="#1F2F55" stroke-width="3" transform="rotate(-18 146 104)"/>
      <circle cx="100" cy="115" r="50" fill="#FFF8EE" stroke="#1F2F55" stroke-width="3"/>
      ${eyes}${cheeks}${mouth}
      <g transform="translate(118 18)"><path d="M6 4h52a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H26l-12 10v-10H6a6 6 0 0 1-6-6V10a6 6 0 0 1 6-6z" fill="#fff" stroke="#1F2F55" stroke-width="3"/>
      <path d="M32 30s-9-5-9-10a4.5 4.5 0 0 1 9-1.5 4.5 4.5 0 0 1 9 1.5c0 5-9 10-9 10z" fill="#F08EA8"/></g>
    </svg>`;
  }
  // Dancing dog with music notes
  return `<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
    <ellipse cx="56" cy="92" rx="17" ry="30" fill="#E9CFA8" stroke="#1F2F55" stroke-width="3" transform="rotate(30 56 92)"/>
    <ellipse cx="144" cy="92" rx="17" ry="30" fill="#E9CFA8" stroke="#1F2F55" stroke-width="3" transform="rotate(-30 144 92)"/>
    <circle cx="100" cy="115" r="50" fill="#FFF8EE" stroke="#1F2F55" stroke-width="3"/>
    ${eyes}${cheeks}${mouth}
    <g fill="#1F2F55"><path d="M30 44v-22l16-4v20" stroke="#1F2F55" stroke-width="3" fill="none"/><circle cx="26" cy="44" r="5"/><circle cx="42" cy="40" r="5"/>
    <path d="M160 36v-18" stroke="#1F2F55" stroke-width="3"/><circle cx="156" cy="37" r="5"/></g>
  </svg>`;
};
