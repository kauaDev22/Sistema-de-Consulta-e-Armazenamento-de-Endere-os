<template>
  <h2>Sistema Web para Consulta e Armazenamento de Endereços</h2>
  <div class="container mx-auto p-4">
    <h1 class="title">Buscar Endereço por CEP</h1>
    <input v-model="cep" placeholder="Digite o CEP" class="input" />
    <button @click="fetchAddress" class="button">Buscar</button>
    
    <div v-if="address" class="address-box">
      <p><strong>Logradouro:</strong> {{ address.logradouro }}</p>
      <p><strong>Bairro:</strong> {{ address.bairro }}</p>
      <p><strong>Cidade:</strong> {{ address.localidade }}</p>
      <p><strong>Estado:</strong> {{ address.uf }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      cep: '',
      address: null
    };
  },
  methods: {
    async fetchAddress() {
      if (!this.cep) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/address/${this.cep}`);
        this.address = response.data;
      } catch (error) {
        alert('CEP não encontrado!');
      }
    },

    async isDuplicateCep() {
      // Check if the current cep is already in the address list
      return this.address && this.address.cep === this.cep;
    },
    
    async fetchAddress() {
      if (!this.cep) return;
      if (this.isDuplicateCep()) {
      alert('CEP já adicionado!');
      return;
      }
      try {
      const response = await axios.get(`http://localhost:5000/api/address/${this.cep}`);
      this.address = response.data;
      } catch (error) {
      alert('CEP não encontrado!');
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 30vh;
  margin: 0 auto;
  
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}

.input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  margin-bottom: 1rem;
}

.button {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}

.address-box {
  margin-top: 1rem;
  padding: rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f1f1f1;
  width: 50%;
  max-width: 100px;
}

.address-box p {
  margin: 0.5rem 0;
}

h2{
  text-align: center;
  color: #333;
}

</style>
