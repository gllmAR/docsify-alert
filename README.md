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
    `
  }
</script>
```

