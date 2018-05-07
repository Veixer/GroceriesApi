using GroceriesApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace GroceriesApi
{
	public class Startup
    {

        public void ConfigureServices(IServiceCollection services)
        {
			services.AddDbContext<GroceryContext>(opt => opt.UseInMemoryDatabase("GroceryList"));
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app)
        {
			app.UseDefaultFiles();
			app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
