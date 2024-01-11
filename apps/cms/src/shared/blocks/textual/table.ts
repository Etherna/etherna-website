import { SlateBlock } from "@mattiaz9/slate-jsx"
import { Editor, Element, Path, Transforms } from "slate"
import { vueJsxCompat } from "../../utils/vue"
import { TableCellBlock, TableCellElement } from "./table-cell"
import { TableRowBlock, TableRowElement } from "./table-row"

import type {
  inferBlockElement,
  inferBlockType,
  RenderElementProps,
} from "@mattiaz9/slate-jsx"

export type TableType = inferBlockType<TableBlock>
export type TableElement = inferBlockElement<TableBlock>

export class TableBlock extends SlateBlock<
  "table",
  {
    rows?: number
    columns?: number
    headers?: ("top" | "left" | "right" | "bottom")[]
  }
> {
  protected _assert = (node: unknown) => {
    return Element.isElement(node) && "type" in node && node.type === "table"
  }

  constructor() {
    super("table", {
      emptyBlock: {
        type: "table",
        children: [
          TableRowBlock.withType("th").emptyBlock,
          TableRowBlock.withType("td").emptyBlock,
        ],
        rows: 2,
        columns: 3,
        headers: ["top"],
      },
      allowedChildren: [TableRowBlock.withId("tr")],
      behaviours: [
        {
          trigger: "normalize",
          action: ({ editor, element, path }) => {
            console.log("ENTER")
            Editor.withoutNormalizing(editor, () => {
              const hasRowHeader = element.headers?.includes("top")
              const hasRowFooter = element.headers?.includes("bottom")
              const hasColHeader = element.headers?.includes("left")
              const hasColFooter = element.headers?.includes("right")
              const elementRows = element.rows || 1
              const elementColumns = element.columns || 1

              let rowsToRemove = Math.max(
                0,
                element.children.length - elementRows,
              )
              let rowsToAdd = Math.max(0, elementRows - element.children.length)
              let childRowsCount = element.children.length
              let dataRowsCount =
                element.children.length -
                (hasRowHeader ? 1 : 0) -
                (hasRowFooter ? 1 : 0)

              const lastRow = element.children[element.children.length - 1]
              const isLastRowFooter =
                childRowsCount > 1 &&
                TableRowBlock.assert(lastRow) &&
                lastRow.children.every(
                  (cell) => TableCellBlock.assert(cell) && cell.type === "th",
                )
              const shouldCreateFooter =
                rowsToAdd > 0 && hasRowFooter && !isLastRowFooter

              for (let r = 0; r < element.children.length; ) {
                const row = element.children[r]
                const rowPath = [...path, r]
                const shouldRemove =
                  rowsToRemove > 0
                    ? hasRowFooter && dataRowsCount - rowsToRemove >= 0
                      ? r >= childRowsCount - 1 - rowsToRemove
                      : childRowsCount - rowsToRemove
                    : false

                if (!TableRowBlock.assert(row) || shouldRemove) {
                  console.log("REMOVE ROW", row, rowPath)

                  Transforms.removeNodes(editor, { at: rowPath })

                  childRowsCount--
                  rowsToRemove--
                } else {
                  let c = 0
                  while (c < Math.max(elementColumns, row.children.length)) {
                    const cell = row.children[c]
                    const cellPath = [...rowPath, c]
                    const shouldAdd =
                      elementColumns > row.children.length &&
                      c >= row.children.length
                    const shouldRemove =
                      (cell && !TableCellBlock.assert(cell)) ||
                      (row.children.length > elementColumns &&
                        c >= elementColumns)
                    const shouldBeTh =
                      (hasRowHeader && r === 0) ||
                      (hasColHeader && c === 0) ||
                      (hasRowFooter &&
                        r ===
                          childRowsCount -
                            1 +
                            (shouldCreateFooter ? rowsToAdd : 0)) ||
                      (hasColFooter && c === elementColumns - 1)

                    if (shouldRemove) {
                      if (Editor.hasPath(editor, cellPath)) {
                        console.log("REMOVE CELL", cell, cellPath)
                        Transforms.removeNodes(editor, { at: cellPath })
                      } else {
                        console.log("EXIT", cell, cellPath)
                        break
                      }
                    } else if (shouldAdd) {
                      console.log("ADD CELL", shouldBeTh)

                      const node = shouldBeTh
                        ? new TableCellBlock("th").emptyBlock
                        : new TableCellBlock("td").emptyBlock
                      Transforms.insertNodes(editor, node, { at: cellPath })
                      c++
                    } else if (cell) {
                      const cellType = shouldBeTh ? "th" : "td"
                      if (cell.type !== cellType) {
                        console.log("UPDATE CELL", cell, cellPath)
                        Transforms.setNodes<TableCellElement>(
                          editor,
                          { type: cellType },
                          { at: cellPath },
                        )
                      }
                      c++
                    }
                  }

                  r++
                }
              }

              const rowInsertIndex = shouldCreateFooter
                ? childRowsCount
                : childRowsCount - 1
              const insertPath = [...path, rowInsertIndex]

              while (rowsToAdd > 0) {
                const shouldBeTh = shouldCreateFooter && rowsToAdd === 1

                const node = {
                  ...new TableRowBlock().emptyBlock,
                  children: Array.from({ length: elementColumns }, () => ({
                    ...new TableCellBlock(shouldBeTh ? "th" : "td").emptyBlock,
                  })),
                }

                console.log("ADD ROW", node)

                Transforms.insertNodes(editor, node, { at: insertPath })

                rowsToAdd--
              }
            })
          },
        },
      ],
    })
  }

  render(props: RenderElementProps<TableBlock>) {
    return vueJsxCompat(
      "table",
      {
        ...props.attributes,
        style: {
          width: "100%",
          "table-layout": "fixed",
          "border-collapse": "collapse",
        },
      },
      vueJsxCompat("tbody", {}, props.children),
    )
  }
}
