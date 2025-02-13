<template>
    <div class="container mx-auto p-4">
      <h1 class="text-xl font-bold mb-4">Endereços Salvos</h1>
      <button @click="fetchAddresses" class="bg-green-500 text-white px-4 py-2 rounded">Carregar Endereços</button>
      <table v-if="addresses.length" class="mt-4 w-full border">
        <thead>
          <tr>
            <th class="border p-2">CEP</th>
            <th class="border p-2">Logradouro</th>
            <th class="border p-2">Bairro</th>
            <th class="border p-2">Cidade</th>
            <th class="border p-2">UF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="address in addresses" :key="address.id">
            <td class="border p-2">{{ address.cep }}</td>
            <td class="border p-2">{{ address.logradouro }}</td>
            <td class="border p-2">{{ address.bairro }}</td>
            <td class="border p-2">{{ address.localidade }}</td>
            <td class="border p-2">{{ address.uf }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        addresses: []
      };
    },
    methods: {
      async fetchAddresses() {
        try {
          const response = await axios.get('http://localhost:5000/api/addresses');
          this.addresses = response.data;
        } catch (error) {
          alert('Erro ao buscar endereços!');
        }
      }
    }
  };
  </script>