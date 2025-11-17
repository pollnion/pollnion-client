name: "Feature / New Item"
description: "Use this template when creating a new feature, UI component, or API addition."
title: "[Type][Module] "
labels: ["enhancement"]
assignees: []

body:

- type: input
  id: type
  attributes:
  label: "Type"
  description: "Choose the type of change: UI or API"
  placeholder: "UI / API"
  required: true

- type: input
  id: module
  attributes:
  label: "Module"
  description: "Specify the module/folder this belongs to (match the folder in the project)"
  placeholder: "Search, Auth, Dashboard..."
  required: true

- type: input
  id: title
  attributes:
  label: "Short Description / Title"
  description: "Provide a concise title for this feature"
  placeholder: "Add Search Functionality"
  required: true

- type: textarea
  id: description
  attributes:
  label: "Detailed Description"
  description: "Provide a more detailed explanation of the feature, why it's needed, and any relevant context."
  placeholder: "- What this feature does\n- Why it's needed\n- Any dependencies or notes"

- type: textarea
  id: acceptance_criteria
  attributes:
  label: "Acceptance Criteria"
  description: "List conditions that must be met for this feature to be considered complete."
  placeholder: "- Criterion 1\n- Criterion 2\n- Criterion 3"
