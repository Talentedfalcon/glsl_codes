#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st,float x){
    return (smoothstep(st.y,st.y,x)-smoothstep(st.y-0.01,st.y+0.03,x));
}

void main(){
    vec3 color=vec3(0.,0.,0.);

    vec2 st=gl_FragCoord.xy/u_resolution;

    float x;
    float y;
    
    /* x=[-1,1], exp=[0.5,3.5] ; pow(abs(x),exp) */
    for(float i=0.0;i<4.0;i+=0.5){
        x=1.-pow(abs(((st.x*2.)-1.)),i);
        y=plot(st,x);
        color+=(vec3(y)*vec3(mod(i,2.),mod(i,3.),0.));
    }

    /* x=[-1,1], exp=[0.5,3.5] ; pow(cos(PI*x/2.0),exp) */
    // for(float i=0.0;i<4.0;i+=0.5){
    //     x=pow(cos(PI*((st.x*2.)-1.)/2.),i);
    //     y=plot(st,x);
    //     color+=(vec3(y)*vec3(mod(i,2.),0.,mod(i,3.)));
    // }

    /* x=[-1,1], exp=[0.5,3.5] ; 1.0-pow(abs(sin(PI*x/2.0)),exp) */    
    // for(float i=0.0;i<4.0;i+=0.5){
    //     x=1.0-pow(abs(sin(PI*((st.x*2.)-1.)/2.0)),i);
    //     y=plot(st,x);
    //     color+=(vec3(y)*vec3(0.,mod(i,2.),mod(i,3.)));
    // }

    /* x=[-1,1], exp=[0.5,3.5] ; pow(min(cois(PI*x/2.0),1.0-abs(x)),exp) */
    // for(float i=0.0;i<4.0;i+=0.5){
    //     x=pow(min(cos(PI*((st.x*2.)-1.)/2.0),1.0-abs((st.x*2.)-1.)),i);
    //     y=plot(st,x);
    //     color+=(vec3(y)*vec3(mod(i,4.),mod(i,3.),0.));
    // }

    /* x=[-1,1], exp=[0.5,3.5] ; pow(max(0.0,abs(x)*2.0-1.0),exp) */
    // for(float i=0.0;i<4.0;i+=0.5){
    //     x=1.0-pow(max(0.0,abs((st.x*2.)-1.)*2.0-1.0),i);
    //     y=plot(st,x);
    //     color+=(vec3(y)*vec3(0.,mod(i,3.),mod(i,4.)));
    // }

    gl_FragColor=vec4(color,1.);
}