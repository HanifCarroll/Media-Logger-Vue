<template>
  <q-page>
    <div class="q-pa-md">
      <q-input outlined v-model="searchValue" label="Search"
               @keyup.enter="onSearch" @keypress="onChange"/>
      <br>
      <div v-if="isLoading" class="row justify-center items-center" style="height: 60vh">
        <q-spinner
          color="primary"
          size="3em"
          :thickness="10"
        />
      </div>
      <q-table
        v-if="!isLoading"
        :data="getData()"
        :columns="columns"
        row-key="name"
        :pagination.sync="pagination"
      >
        <template v-slot:body-cell-thumbnail="props" >
          <q-td style="width: 125px" class="text-left">
            <a :href="props.row.url">
              <q-img v-if="props.value" :src="props.value" :ratio="16/9"/>
            </a>
          </q-td>
        </template>
        <template v-slot:body-cell-artist="props" >
          <q-td class="text-left">
            <a v-if="props.row.authorUrl"
               :href="props.row.authorUrl"
               style="color: black; text-decoration: none"
            >
              {{ props.value }}
            </a>
            <span v-else>{{ props.value }}</span>
          </q-td>
        </template>
        <template v-slot:body-cell-title="props" >
          <q-td class="text-left">
            <a :href="props.row.url" style="color: black; text-decoration: none">
              {{ props.value }}
            </a>
          </q-td>
        </template>
        <template v-slot:body-cell-postedBy="props" >
          <q-td class="text-left">
            {{ props.value }}
          </q-td>
        </template>
        <template v-slot:body-cell-service="props" >
          <q-td class="text-left">
            <a :href="props.row.url" style="color: black; text-decoration: none">
              {{ props.value }}
            </a>
          </q-td>
        </template>
        <template v-slot:body-cell-time="props" >
          <q-td class="text-left">
            {{ props.value }}
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'PageTable',

  data() {
    return {
      searchValue: '',
      searchResults: [],
      searchOptions: {
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'title',
          'artist',
          'user',
          'service',
        ],
      },
      pagination: {
        rowsPerPage: 10,
        sortBy: 'time',
        descending: true,
      },
      columns: [
        {
          name: 'thumbnail',
          field: 'thumbnailUrl',
          label: 'Thumbnail',
          align: 'left',
        },
        {
          name: 'artist',
          field: 'authorName',
          label: 'Artist',
          sortable: true,
          align: 'left',
        },
        {
          name: 'title',
          field: 'title',
          label: 'Title',
          sortable: true,
          align: 'left',
        },
        {
          name: 'postedBy',
          field: 'postedBy',
          label: 'Posted By',
          sortable: true,
          align: 'left',
        },
        {
          name: 'service',
          field: 'service',
          label: 'Service',
          sortable: true,
          align: 'left',
        },
        {
          name: 'time',
          field: 'timePosted',
          label: 'Time Posted',
          sortable: true,
          align: 'left',
          format: val => moment(val).format('MM/DD/YY hh:mm A'),
        },
      ],
    };
  },

  methods: {
    getData() {
      return this.searchValue && this.searchResults.length ? this.searchResults : this.tableData;
    },

    onSearch() {
      this.$search(this.searchValue, this.tableData, this.searchOptions)
        .then((results) => {
          this.searchResults = results;
        });
    },

    onChange() {
      if (this.searchValue === '') {
        this.searchResults = [];
      }
    },
  },

  mounted() {
    this.$store.dispatch('table/loadTableData');
  },

  computed: {
    ...mapState('table', [
      'tableData',
      'isLoading',
      'isError',
    ]),
  },
};
</script>
