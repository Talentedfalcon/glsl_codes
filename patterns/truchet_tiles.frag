#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 tile(vec2 st,vec2 scale){
    st*=scale;
    return fract(st);
}

vec2 rotate2D(vec2 st,float angle){
    st-=0.5;
    st=mat2(cos(angle),-sin(angle),
        sin(angle),cos(angle))*st;
    st+=0.5;
    return st;
}

vec2 rotate_tile(vec2 st){
    st*=2.0;
    float index=0.0;
    index+=step(1.,mod(st.x,2.0));
    index+=step(1.,mod(st.y,2.0))*2.0;
    st=fract(st);
    if(index==1.0){
        st=rotate2D(st,PI*0.5);
    }
    else if(index==2.0){
        st=rotate2D(st,PI*-0.5);
    }
    else if(index==3.0){
        st=rotate2D(st,PI);
    }
    return st;
}

float solid_rect(vec2 st,vec2 pos,float width,float height){
    pos-=vec2(width/2.,height/2.);
    float l=step(pos.x,st.x);
    float r=step(pos.x+width,st.x);
    float b=step(pos.y,st.y);
    float t=step(pos.y+height,st.y);
    return (l-r)*(b-t);
}

float semicircle(vec2 st,vec2 pos,float diameter){
    diameter/=2.;
    st-=pos;
    float pct=1.-smoothstep(diameter-0.001,diameter+0.001,sqrt(dot(st,st)))-step(st.y,0.);
    return pct;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    st.x*=u_resolution.x/u_resolution.y;
    vec3 color=vec3(0.0);

    st=tile(st,vec2(2.0));
    st=rotate_tile(st*2.);
    color=vec3(0.9,st.x,st.y);
    st=rotate_tile(st);
    st=rotate2D(st,PI*u_time*0.5);

    color*=vec3(step(st.x,st.y));
    color*=vec3(solid_rect(st,vec2(0.5),0.6,1.0));
    // color*=vec3(semicircle(st,vec2(0.5),0.8));

    gl_FragColor=vec4(color,1.0);
}