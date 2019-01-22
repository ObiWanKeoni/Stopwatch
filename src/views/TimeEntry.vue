<template>
    <div>
        <b-row class="mb-4">
            <b-col lg="12">
                <b-card-group>
                    <b-card no-body class="p-4">
                        <b-card-body>
                            <b-form @submit.prevent="login">
                                <h1>Log your time</h1>
                                <b-input-group class="mb-3 mt-3">
                                    <b-input-group-prepend><b-input-group-text><i class="icon-clock"></i></b-input-group-text></b-input-group-prepend>
                                    <b-form-select
                                                    :options="categories"
                                                    required
                                                    v-model="category">
                                    </b-form-select>
                                </b-input-group>
                                    <b-input-group class="mb-3">
                                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                                    <b-form-select
                                                    :options="categories"
                                                    required
                                                    v-model="category">
                                    </b-form-select>
                                </b-input-group>
                                <b-row class="mb-3">
                                    <b-col cols="12">
                                        <b-button type="submit" variant="primary" class="pull-right">Login</b-button>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </b-card-body>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="12">
                <c-table :table-data="items" :fields="fields" :per-page="10" caption="<i class='fa fa-clock-o'></i> Time Entries"></c-table>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import cTable from '../components/base/Table.vue'
import { firebaseAuth, db } from '../config/firebase.config';
const timeEntries = db.collection('time-entries');
export default {
    name: 'time-entry',
    components: {cTable},
    data() {
        return {
            items: [],
            fields: ['date', 'category', 'description', 'hours'],
            categories: ['Projects', 'Lean', 'Professional Development', 'User Specific', 'Communication & Perf. Mgmt.', 'Overhead'],
            category: 'Projects',
            subCategories: [],
            subCategory: '',
        }
    },
    methods: {
        getTimeEntries() {
            this.tableData = [];
            return timeEntries
                    .where("userId", "==", firebaseAuth().currentUser.uid)
                    .orderBy("date", "desc")
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            this.items.push(doc.data());
                        });
                    })
                    .catch(error => {
                        console.log("Error getting documents: ", error);
                    });
        }
    },
    created () {
        this.getTimeEntries();
    }
}
</script>