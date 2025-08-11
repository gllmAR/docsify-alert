# docsify-alert
brings gfm/commonmarks alert boxs to docsify

## Features

- Support for different types of alert boxes:
  - Note
  - Tip
  - Important
  - Warning 
  - Caution
- SVG icons for each alert type
- Customizable styles
  

## Use case

### Important Notes

> [!IMPORTANT]
> This is a crucial piece of information. 

### Tips

> [!TIP]
> Here is a useful tip to help you.

### Warnings

> [!WARNING]
> Pay attention to this critical warning.

### Notes

> [!NOTE]
> This is some additional information.

### Caution

> [!CAUTION]
> Be aware of these potential consequences.


### Multilines Tips

> [!TIP]
> Here some multiline a useful tip to help you.


### Warnings

> [!WARNING]
> Pay attention to this critical warning. 0000000 0000000 0000000 m0000000 0000000 0000000

### Notes

> [!NOTE]
> This is some additional information.

### Caution

> [!CAUTION]
> Be aware of these potential consequences.


## Multiline Alert Stress Test

### Multiline Note

> [!NOTE]
> This is the first line of a multiline note.
> This is the second line of the note.
> This is the third line of the note.
> This is the fourth line of the note.
> This is the fifth line of the note.

### Multiline Tip

> [!TIP]
> This is the first line of a multiline tip.
> This is the second line of the tip.
> This is the third line of the tip.
> This is the fourth line of the tip.
> This is the fifth line of the tip.

### Multiline Warning

> [!WARNING]
> This is the first line of a multiline warning.
> This is the second line of the warning.
> This is the third line of the warning.
> This is the fourth line of the warning.
> This is the fifth line of the warning.


### Multiline Important

> [!IMPORTANT]
> This is the first line of a multiline important alert.
> This is the second line of the important alert.
> This is the third line of the important alert.
> This is the fourth line of the important alert.
> This is the fifth line of the important alert.

### Multiline Caution

> [!CAUTION]
> This is the first line of a multiline caution.
> This is the second line of the caution.
> This is the third line of the caution.
> This is the fourth line of the caution.
> This is the fifth line of the caution.


## Installation

To use the `docsify-alerts` plugin in your Docsify project add the following script to your `index.html`:

```javascript
<script src="https://gllmar.github.io/docsify-alert/docsify-alerts.js"></script>
```

## Customisation


You can override the default styles by specifying custom CSS in the alertStyles property in your index.html

```javascript
<script>
  window.$docsify = {
    name: 'Your Documentation',
    repo: '',
    loadSidebar: true,
    subMaxLevel: 2,
    alias: {
      '/.*/_sidebar.md': '/_sidebar.md'
    },
    alertStyles: `
      .alert.note {
        background-color: #e0f0ff;
        border-color: #2176ff;
      }
      .alert.tip {
        background-color: #e0ffe0;
        border-color: #21a121;
      }
      .alert.important {
        background-color: #f0e0ff;
        border-color: #a121ff;
      }
      .alert.warning {
        background-color: #fff0e0;
        border-color: #ffa121;
      }
      .alert.caution {
        background-color: #ffe0e0;
        border-color: #ff2121;
      }
      /* Custom CSS variable to override text color */
      :root {
        --alert-text-color: black; /* Change this to the desired color */
      }
    `
  }
</script>
```

