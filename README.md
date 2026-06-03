# strapi-get-all-relations

A CLI tool that scans your Strapi project and exports all entity relations as **JSON** and **CSV**.

Useful for auditing content types, generating documentation, or understanding the data model of a large Strapi codebase.

## Output

- `relations.json` — full relation map as a nested object
- `table.csv` — flat table with columns: `Entity`, `Relation`, `Target`

## Requirements

- Node.js 18+
- Strapi project (v4)

## Installation

```bash
git clone https://github.com/AndrewHaluza/strapi-get-all-relations.git
cd strapi-get-all-relations
npm install
```

## Configuration

Create a `.env` file in the root:

```env
API_PATH=/absolute/path/to/your/strapi/src/api
COMPONENTS_PATH=/absolute/path/to/your/strapi/src/components
OUTPUT_PATH=/absolute/path/to/output/folder
```

## Usage

```bash
npm start
```

The tool will scan all content types and components in your Strapi project and write two files to `OUTPUT_PATH`.

## Example output

`table.csv`:
```
Entity,Relation,Target
article,author,user
article,category,category
product,images,media
```

## License

MIT
