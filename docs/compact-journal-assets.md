# Compact journal assets

The user approved the charcoal and mint reference, with a matching light theme, a single vertical page, and horizontal card rows. Existing routes outside `/design` remain unchanged.

## Portrait and loader

`public/stella.jpg` matches the user supplied Stella illustration byte for byte. It is used only for the loading state.

`public/omkar-jacket.webp` is a transparent portrait isolated from the user supplied reference using the built-in image tool, then encoded as WebP with Sharp. The original generated image remains outside the repository.

Prompt: Extract only the illustrated smiling young man wearing a black jacket over an olive shirt from the top right of the supplied website mockup. Preserve face likeness, hair, beard, pose, clothing, and painted style. Remove all text, annotations, backgrounds, and other website elements. Return only the chest-up portrait on a transparent background with complete hair and shoulders.

## Card artwork

`public/journal-card-art.webp` is an illustrative contact sheet created with the built-in image tool and encoded with Sharp. It does not depict a verified trip or a real server installation. CSS selects nine equal tiles.

Prompt: Create an equal three by three contact sheet, no gaps, text, borders or branding, in a cinematic dark charcoal, teal, and forest palette. In row order: anonymous person seen from behind overlooking misty mountains; abstract forest green flowing fabric; server racks; green terminal display; shooting star above mountains; headphones and vinyl; automotive wheel detail; badminton racket and shuttlecock; stacked books. Compose each tile as a separate landscape card photograph.

## Content

Résumé facts are carried forward from the provided SDE1 PDF. The PDF is available as `public/Omkar-Jawalikar-Resume.pdf`. AtlasPay performance figures remain explicitly attributed to a short résumé-reported local Docker Compose run, without production claims.

The user subsequently requested an experience timeline in section 02, with no mountain panel, and actual writing previews in section 03. Medium previews now come from the official profile RSS feed, cached for one hour with a three second request timeout and a real existing article as the offline fallback. LinkedIn links to the user's recent activity rather than claiming to display an automatic LinkedIn feed. No API credentials, third-party feed service, or scraped LinkedIn content is used. The earlier generated mountain tile remains unused within the shared contact sheet.

The user also supplied a reference ChatGPT conversation. It was read for context; the newer instructions in this chat govern the timeline, live Medium feed, and horizontal card rows.
