<script lang="ts">
    import { createTable, Render, Subscribe } from "svelte-headless-table";
    import { addTableFilter } from "svelte-headless-table/plugins";
    import { readable } from "svelte/store";
    import * as Table from "$lib/components/ui/table";
    import { topicFilterValue } from "$lib/stores/filter-store";
    import { responsesData } from "$lib/stores/session-store";
    

    const categories = [
        { value: "Category 1", label: "Category 1" },
        { value: "Category 2", label: "Category 2" },
        { value: "Category 3", label: "Category 3" },
    ];

    const table = createTable(responsesData, {
        filter: addTableFilter({
            fn: ({ filterValue, value }: any) => 
                filterValue == "" || filterValue =="All" || value.toLowerCase().includes(filterValue?.toLowerCase())
        })
    });

    const columns = table.createColumns([
        table.column({
            accessor: "text",
            header: "Response",
            plugins: {
                filter: {
                    exclude: true
                }
            }
        }),
        table.column({
            accessor: "category",
            header: "Topic",
        })
    ]);

    const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } = table.createViewModel(columns);
    const { filterValue } = pluginStates.filter;
    $: $filterValue = $topicFilterValue;
</script>

<div class="">
    <Table.Root {...$tableAttrs}>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
</div>