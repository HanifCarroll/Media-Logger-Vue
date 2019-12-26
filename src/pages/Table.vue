<template>
  <q-page>
    <div class="q-pa-md">
      <q-input outlined v-model="searchValue" label="Search"
               @keyup.enter="onSearch" @keypress="onChange"/>
      <br>
      <div v-if="!isLoaded" class="row justify-center items-center" style="height: 60vh">
        <q-spinner
          color="primary"
          size="3em"
          :thickness="10"
        />
      </div>
      <q-table
        v-if="isLoaded"
        :data="getData()"
        :columns="columns"
        row-key="name"
        :pagination.sync="pagination"
      >
        <template v-slot:body-cell-thumbnail="props" >
          <q-td class="text-left">
            <q-avatar v-if="props.value" square>
              <img :src="props.value" />
            </q-avatar>
          </q-td>
        </template>
        <template v-slot:body-cell-url="props" >
          <q-td class="text-left">
            <a :href="props.value" style="color: black; text-decoration: none">{{ props.value }}</a>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'PageTable',

  data() {
    return {
      isLoaded: false,
      data: [],
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
      columns: [
        {
          name: 'thumbnail',
          field: 'thumbnail_url',
          label: 'Thumbnail',
          sortable: true,
          align: 'left',
        },
        {
          name: 'artist',
          field: 'artist',
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
          name: 'url',
          field: 'url',
          label: 'URL',
          sortable: true,
          align: 'left',
        },
        {
          name: 'user',
          field: 'user',
          label: 'User',
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
          field: 'time_posted',
          label: 'Time Posted',
          sortable: true,
          align: 'left',
          format: val => moment(val).format('MM/DD/YY hh:mm A'),
        },
      ],
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  methods: {
    getData() {
      return this.searchValue && this.searchResults.length ? this.searchResults : this.data;
    },
    onSearch() {
      this.$search(this.searchValue, this.data, this.searchOptions)
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
    axios
      .get('https://media-logger-server.herokuapp.com/logger')
      .then((res) => {
        this.isLoaded = true;
        this.data = res.data.map(data => data.fields);
      });
  },
};
</script>
