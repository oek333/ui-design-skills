// Serialized by the backend (api/serializers/entries.py). Shipped to the client as-is.
window.BOARD = {
  stages: [
    { id: "drafting", label: "Drafting", uploadEnabled: true },
    { id: "review", label: "Review", uploadEnabled: false },
    { id: "revision", label: "Revision", uploadEnabled: true },
    { id: "copyedit", label: "Copyedit", uploadEnabled: false },
    { id: "proof", label: "Proof", uploadEnabled: true },
    { id: "approval", label: "Approval", uploadEnabled: false },
    { id: "layout", label: "Layout", uploadEnabled: false },
    { id: "published", label: "Published", uploadEnabled: false }
  ],
  terms: [
    {
      id: 41, term: "ḥikāya", stage: "revision", assignee_role: "ROLE_EDITOR_2",
      status_code: "editorial_response_to_author", statusLabel: "Awaiting author",
      latestFileName: "hikaya_v3_author-revised.docx",
      links: { currentDraft: { url: "/files/41/hikaya_v3_author-revised.docx" } },
      files: [
        { name: "hikaya_v1.docx", stage: "drafting", uploadedAt: "2026-03-02T10:14:00Z", url: "/files/41/hikaya_v1.docx" },
        { name: "hikaya_v2_reviewed.docx", stage: "review", uploadedAt: "2026-04-11T08:02:00Z", url: "/files/41/hikaya_v2_reviewed.docx" },
        { name: "hikaya_v3_author-revised.docx", stage: "revision", uploadedAt: "2026-05-20T16:40:00Z", url: "/files/41/hikaya_v3_author-revised.docx" }
      ],
      versionCount: 3
    },
    {
      id: 57, term: "waḍʿ al-lugha", stage: "copyedit", assignee_role: "ROLE_COPYEDITOR",
      status_code: "ce_pending_internal", statusLabel: "With copyeditor",
      latestFileName: "wad_al-lugha_v2.docx",
      links: { currentDraft: { url: "/files/57/wad_al-lugha_v2.docx" } },
      files: [
        { name: "wad_al-lugha_v2.docx", stage: "revision", uploadedAt: "2026-06-01T09:00:00Z", url: "/files/57/wad_al-lugha_v2.docx" },
        { name: "wad_al-lugha_v1.docx", stage: "drafting", uploadedAt: "2026-04-28T13:30:00Z", url: "/files/57/wad_al-lugha_v1.docx" }
      ],
      versionCount: 2
    },
    {
      id: 63, term: "riḥla", stage: "drafting", assignee_role: "ROLE_AUTHOR",
      status_code: "draft_open", statusLabel: "Drafting",
      latestFileName: null, links: { currentDraft: null }, files: [], versionCount: 0
    }
  ]
};
